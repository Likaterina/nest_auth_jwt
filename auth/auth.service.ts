import { Injectable } from "@nestjs/common"
import { UsersService } from "users/users.service"
import { JwtService } from "@nestjs/jwt"
import { User } from "users/users.service"

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  private async validate(userData: User): Promise<User> {
    return await this.usersService.findOne(userData.username)
  }

  public async login(user: User): Promise<any | { status: number }> {
    return this.validate(user).then(userData => {
      if (!userData) {
        return { status: 404 }
      }    
      let payload = `${userData.username}${userData.userId}`
      const accessToken = this.jwtService.sign(payload)
      return {
        expires_in: 3600,
        access_token: accessToken,
        user_id: payload,
        status: 200
      }
    })
  }

  public async register(user: User): Promise<any> {
    return this.usersService.create(user)
  }
}
