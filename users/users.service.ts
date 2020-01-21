import { Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger"

export interface User extends Document {
    readonly userId: number,
    readonly username: string,
    readonly password: string
}

export class CreateUserDto {
    readonly userId: number

    @ApiProperty()
    readonly username: string

    @ApiProperty()
    readonly password: string
}

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly users: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
      const createdUser = await this.users(createUserDto)
      return await createdUser.save()
  }

  async findOne(username: string): Promise<User | undefined> {
    console.log(username)
    return await this.users.find(user => {
      console.log(user)
      user.username === username
    })
  }
}
