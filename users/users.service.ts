import { Injectable, Inject, NotFoundException } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { UserEntity } from "./user.entity"
import { User } from "./user.interface"
import { CreateUserDto } from "./user.dto"

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly users: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.users(createUserDto)
    console.log('create', createdUser)
    return createdUser.save()
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.findOne({
      username,
    })
  }

  async findById(id: string): Promise<UserEntity> {
    const result = await this.users.findOne({
      _id: id
    })
    if (result) {
      return result.toObject()
    }
    return null
  }
}

// formik + yup
// rsuite
// HOC, render props
// fragment
// ref
// portal +
// context
// styled-components
