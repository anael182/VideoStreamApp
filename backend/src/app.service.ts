import { Injectable } from '@nestjs/common'
import 'dotenv/config'

@Injectable()
export class AppService {
    getHello(): string {
        return `Hello World! As we can see, .env variables works well ! ${process.env.SECRET}`
    }
}
