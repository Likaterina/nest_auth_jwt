import { Injectable, Inject, NotFoundException } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { prop as Property } from "@hasezoey/typegoose"
import { ModelType } from "@hasezoey/typegoose"
import { Exclude, Transform } from "class-transformer"
import { IsEmail, IsNotEmpty } from "class-validator"

export interface User extends Document {
  readonly _id: any
  readonly username: string
  readonly password: string
}

export class UserEntity {
  @Transform(id => id.toString())
  public _id: string
  public username!: string

  @Exclude()
  public password: string

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}

export class CreateUserDto {
  readonly _id: any
  @ApiProperty()
  @IsNotEmpty()
  readonly username: string

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string
}

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private readonly users: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.users(createUserDto)
    return createdUser.save()
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.findOne({
      username
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
// portal
// context
// styled-components




