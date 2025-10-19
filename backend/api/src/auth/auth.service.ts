import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import {
  RefreshToken,
  RefreshTokenDocument,
} from '../schemas/refresh-token.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<UserDocument>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: mongoose.Model<RefreshTokenDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, role, ...userData } = registerDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new this.userModel({
      ...userData,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await user.save();

    // Generate tokens
    const tokens = await this.generateTokens(
      (savedUser._id as string).toString(),
    );

    return {
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: (savedUser._id as string).toString(),
          role: savedUser.role,
          name: savedUser.name,
          email: savedUser.email,
          phone: savedUser.phone,
          isVerified: savedUser.isVerified,
        },
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Generate tokens
    const tokens = await this.generateTokens((user._id as string).toString());

    return {
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: (user._id as string).toString(),
          role: user.role,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isVerified: user.isVerified,
        },
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    // Find refresh token
    const tokenDoc = await this.refreshTokenModel
      .findOne({
        token: refreshToken,
        revokedAt: null,
        expiresAt: { $gt: new Date() },
      })
      .populate('userId');

    if (!tokenDoc) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = tokenDoc.userId as unknown as string;

    // Generate new tokens
    const tokens = await this.generateTokens(user);

    // Revoke old refresh token
    await this.refreshTokenModel.findByIdAndUpdate(tokenDoc._id, {
      revokedAt: new Date(),
    });

    return {
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
  }

  async logout(refreshToken: string) {
    // Revoke refresh token
    await this.refreshTokenModel.findOneAndUpdate(
      { token: refreshToken },
      { revokedAt: new Date() },
    );

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  private async generateTokens(userId: string) {
    const payload = { sub: userId };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '24h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Save refresh token to database
    const refreshTokenDoc = new this.refreshTokenModel({
      token: refreshToken,
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    await refreshTokenDoc.save();

    return {
      accessToken,
      refreshToken,
    };
  }
}
