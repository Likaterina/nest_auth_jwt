import { Controller, Get, UseGuards, Post, Request, Body } from "@nestjs/common"
import { AppService } from "./app.service"
import { AuthGuard } from "@nestjs/passport"
import { AuthService } from "../auth/auth.service"
import { CreateUserDto } from "users/users.service"
import { UsersService } from "../users/users.service"

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService,
    private readonly usersService: UsersService,) {}

  @UseGuards(AuthGuard("local"))
  @Post("auth/login")
  async login(@Request() req) {
    return this.authService.login(req.user)
  }


  @Post("auth/registration")
  async create(@Body() createUserDto: CreateUserDto) {
    await this.create(createUserDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  getProfile(@Request() req) {
    return req.user
  }
}
