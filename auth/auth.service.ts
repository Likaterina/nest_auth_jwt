import {
  Injectable,
  UnauthorizedException,
  ForbiddenException
} from "@nestjs/common"
import { UsersService } from "users/users.service"
import { JwtService } from "@nestjs/jwt"
import { User } from "users/user.interface"
import { CreateUserDto } from "users/user.dto"

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  private async validate(userData: CreateUserDto): Promise<User> {
    return await this.usersService.findOne(userData.username)
  }

  public async login(user: CreateUserDto): Promise<any | { status: number }> {
    return this.validate(user).then(userData => {
      console.log(userData)
      if (userData == null) {
        throw new UnauthorizedException()
      }
      let payload = "" + userData.username + userData._id
      const accessToken = this.jwtService.sign(payload)
      return {
        expiresIn: 3600,
        accessToken: accessToken,
        userId: payload,
        status: 200,
      }
    })
  }

  public async register(
    user: CreateUserDto
  ): Promise<any | { status: number }> {
    console.log("user", user)
    return this.validate(user).then(userData => {
      console.log("userData", userData)
      if (userData) {
        throw new ForbiddenException()
      } else {
        return this.usersService.create(user)
      }
    })
  }

  
}
