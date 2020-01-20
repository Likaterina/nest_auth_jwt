import { Injectable } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { Document } from 'mongoose';

export interface User extends Document {
    readonly username: string,
    readonly password: string
}

export class CreateUserDto {
    readonly username: string
    readonly password: string
}

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly users: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
      const createdUser = new this.users(createUserDto)
      return createdUser.save()
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username)
  }
}
