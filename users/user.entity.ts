import { Exclude, Transform } from "class-transformer"


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