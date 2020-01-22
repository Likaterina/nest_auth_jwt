import { Injectable, Inject, NotFoundException } from "@nestjs/common"
import { Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose"
import { Document } from "mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { prop as Property } from "@hasezoey/typegoose"
import { ModelType } from "@hasezoey/typegoose"
import { Exclude } from "class-transformer"
import { IsEmail, IsNotEmpty } from "class-validator"

export interface User extends Document {
  readonly _id: any
  readonly username: string
  readonly password: string
}

export class UserEntity {
  public _id!: string

  @Property()
  public username!: string

  @Exclude()
  @Property()
  public password: string 

  // constructor(partial: Partial<UserEntity>) {
  //   Object.assign(this, partial);
  // }
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
    return await createdUser.save()
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.findOne({
      username: username
    })
  }

  async findById(id: string): Promise<UserEntity> {
    const result = await this.users.findOne({
      _id: id
    })


    if (result) {
      console.log("result", result)

      const classProto = Object.getPrototypeOf(new UserEntity())
      console.log("classProto", classProto)
      Object.setPrototypeOf(result.toObject(), classProto)
      console.log("result", result)
      return result
    }
    throw new NotFoundException(`User with Id '${id}' not found.`)
  }

  //async findAll(): Promise<UserEntity> {
  //  return await this.users.find({}).catch(() => {
  //    console.log('smth')
  //    throw new UserEntity()
  //  })
  //}
}
