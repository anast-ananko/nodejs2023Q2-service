import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { IPayload } from 'src/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(createUserDto: CreateUserDto) {
    const user = await this.validateUser(createUserDto);

    return {
      accessToken: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
    };
  }

  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findOneByLogin(
      createUserDto.login,
    );

    if (candidate) {
      throw new HttpException(
        'User with such login exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.CRYPT_SALT, 10) || 10,
    );

    const user = await this.usersService.create({
      ...createUserDto,
      password: hashPassword,
    });

    return user;
  }

  private async generateAccessToken(user: UserEntity) {
    const payload = { login: user.login, id: user.id };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY || 'SECRET_KEY',
      expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h',
    });
  }

  private async generateRefreshToken(user: UserEntity) {
    const payload = { login: user.login, id: user.id };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY || 'SECRET_KEY',
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
    });
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.findOneByLogin(userDto.login);

    if (!user) {
      throw new ForbiddenException('Incorrect email or password');
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (passwordEquals) {
      return user;
    }

    throw new ForbiddenException('Incorrect email or password');
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    if (!refreshTokenDto.refreshToken) {
      throw new UnauthorizedException(
        'You are not authorized to access this resource.',
      );
    }

    try {
      const payload: IPayload = await this.jwtService.verify(
        refreshTokenDto.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY || 'SECRET_KEY',
        },
      );

      const user = await this.usersService.findOneByLogin(payload.login);

      return {
        accessToken: await this.generateAccessToken(user),
        refreshToken: await this.generateRefreshToken(user),
      };
    } catch {
      throw new ForbiddenException('Access denied');
    }
  }
}
