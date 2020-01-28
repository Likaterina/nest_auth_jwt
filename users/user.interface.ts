export interface User extends Document {
    readonly _id: any
    readonly username: string
    readonly password: string
  }