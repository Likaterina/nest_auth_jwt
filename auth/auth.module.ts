import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthService } from "./auth.service"
import { UsersModule } from "users/users.module"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { Salt } from "./Salt"
import { JwtStrategy } from "./jwt.strategy"
import { LocalStrategy } from "./local.strategy"
import { AppController } from "../src/app.controller"

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/auth'),
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: Salt.secret,
      signOptions: { expiresIn: "60s" }
    }),
  ],
  controllers: [AppController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
