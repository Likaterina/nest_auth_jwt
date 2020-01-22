import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthService } from "./auth.service"
import * as Joi from "@hapi/joi"
import { UsersModule } from "users/users.module"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { Salt } from "./Salt"

import { AppController } from "../src/app.controller"

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/auth"),
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: Salt.secret
    })
  ],
  controllers: [AppController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
