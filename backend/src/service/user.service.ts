import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose'
import { User, UserDocument } from '../model/user.schema'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async signup(user: User): Promise<User> {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(user.password, salt)
        const reqBody = {
            fullname: user.fullname,
            email: user.email,
            password: hash,
        }
        const newUser = new this.userModel(reqBody)
        return newUser.save()
    }
    async signin(user: User, jwt: JwtService): Promise<any> {
        const foundUser = await this.userModel
            .findOne({ email: user.email })
            .exec()
        console.log(foundUser)
        if (foundUser) {
            const { password } = foundUser
            if (await bcrypt.compare(user.password, password)) {
                const payload = { email: user.email }
                console.log(jwt.sign(payload))
                return {
                    token: jwt.sign(payload),
                }
            }
            return new HttpException(
                'Incorrect username or password',
                HttpStatus.UNAUTHORIZED
            )
        }
        return new HttpException(
            'Incorrect username or password',
            HttpStatus.UNAUTHORIZED
        )
    }
    async getOne(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email }).exec()
    }
}
