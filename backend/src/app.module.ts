import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { MulterModule } from '@nestjs/platform-express'
import { ServeStaticModule } from '@nestjs/serve-static'
import 'dotenv/config'
import { diskStorage } from 'multer'
import { join } from 'path/posix'
import { v4 as uuidv4 } from 'uuid'
import { AppController } from './app.controller'
import { isAuthenticated } from './app.middleware'
import { AppService } from './app.service'
import { UserController } from './controller/user.controller'
import { VideoController } from './controller/video.controller'
import { User, UserSchema } from './model/user.schema'
import { Video, VideoSchema } from './model/video-schema'
import { UserService } from './service/user.service'
import { VideoService } from './service/video.service'

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/Stream'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: process.env.TOKEN_DURATION },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        MulterModule.register({
            storage: diskStorage({
                destination: './public',
                filename: (req, file, cb) => {
                    const ext = file.mimetype.split('/')[1]
                    cb(null, `${uuidv4()}-${Date.now()}.${ext}`)
                },
            }),
        }),
    ],
    controllers: [AppController, VideoController, UserController],
    providers: [AppService, VideoService, UserService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(isAuthenticated)
            .exclude({ path: 'api/video/:id', method: RequestMethod.GET })
            .forRoutes(VideoController)
    }
}
