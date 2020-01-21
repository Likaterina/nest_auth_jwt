import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { AuthService } from "../auth/auth.service"
import { CreateUserDto } from "users/users.service"

import { ApiResponse } from "@nestjs/swagger"

@Controller("auth")
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post("registration")
  @ApiResponse({ status: 201, description: "Ok" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  register(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.register(createUserDto)
  }

  @Post("login")
  @ApiResponse({ status: 201, description: "Ok" })
  @ApiResponse({ status: 403, description: "This user as already exists" })
  login(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.login(createUserDto)
  }
}
