import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  NotFoundException
} from "@nestjs/common"
import { AuthService } from "../auth/auth.service"
import { CreateUserDto, UsersService } from "users/users.service"
import { UserEntity } from "../users/users.service"

import { ApiResponse } from "@nestjs/swagger"

@Controller("auth")
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
  async findById(@Param("id") id: string): Promise<UserEntity> {
    console.log("get", id)
   const user = await this.usersService.findById(id);
   if (user) {
      return new UserEntity(user);
   }

   throw new NotFoundException(`User with Id '${id}' not found.`)


  }

  
}
