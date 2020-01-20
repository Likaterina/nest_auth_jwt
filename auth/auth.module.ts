import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'users/users.module';
import { JwtModule } from '@nestjs/jwt'; 
import { PassportModule } from '@nestjs/passport';
import { Salt } from './Salt'
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AppController } from '../src/app.controller'

@Module({
  imports: [UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: Salt.secret,
      signOptions: { expiresIn: '60s'}
    }),
    UsersModule
],
  controllers: [AppController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]

})
export class AuthModule {}
