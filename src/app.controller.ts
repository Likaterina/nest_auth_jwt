import { Controller, Get, UseGuards, Post, Request, Body } from "@nestjs/common"
import { AuthService } from "../auth/auth.service"
import { CreateUserDto } from "users/users.service"


@Controller("auth")
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post("registration")
  async register(@Body() createUserDto: CreateUserDto): Promise<any>  {
    await this.authService.register(createUserDto)
  }

  @Post("login")
  async login(@Body() createUserDto: CreateUserDto): Promise<any>  {
    await this.authService.login(createUserDto)
  }

}
