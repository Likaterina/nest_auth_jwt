import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthService } from "./auth.service"
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
      secret: Salt.secret,
      signOptions: { expiresIn: "60s" }
    })
  ],
  controllers: [AppController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
