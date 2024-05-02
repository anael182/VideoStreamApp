import {
    Injectable,
    NotFoundException,
    ServiceUnavailableException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Request, Response } from 'express'
import { createReadStream, statSync } from 'fs'
import { Model } from 'mongoose'
import { join } from 'path'
import * as validator from 'validator'
import { Video, VideoDocument } from '../model/video-schema'

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video.name) private videoModel: Model<VideoDocument>
    ) {}

    async createVideo(video: Partial<Video>): Promise<Video> {
        if (!validator.isURL(video.url)) {
            throw new Error('Invalid video URL')
        }
        const newVideo = new this.videoModel(video)
        return newVideo.save()
    }

    async readVideo(id?: string): Promise<Video | Video[]> {
        if (id) {
            return this.videoModel.findById(id).populate('createdBy').exec()
        } else {
            return this.videoModel.find().populate('createdBy').exec()
        }
    }

    async streamVideo(id: string, response: Response, request: Request) {
        try {
            const data = await this.videoModel.findById(id)
            if (!data) {
                throw new NotFoundException('Video not found')
            }
            const { range } = request.headers
            if (range) {
                const { video } = data
                const videoPath = join(process.cwd(), `./public/${video}`)
                const stats = statSync(videoPath)
                const CHUNK_SIZE = 10 ** 6 // 1MB chunk size
                let start = 0
                let end = stats.size - 1
                const parts = range.replace(/bytes=/, '').split('-')
                if (parts.length === 2) {
                    start = parseInt(parts[0], 10)
                    end = parseInt(parts[1], 10)
                }
                const chunkSize = end - start + 1
                response.status(206).header({
                    'Content-Range': `bytes ${start}-${end}/${stats.size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': 'video/mp4',
                })
                const videoStream = createReadStream(videoPath, { start, end })
                videoStream.pipe(response)
            } else {
                throw new NotFoundException('Range header not found')
            }
        } catch (error) {
            console.error(error)
            throw new ServiceUnavailableException()
        }
    }

    async update(id: string, videoData: Partial<Video>): Promise<Video> {
        if (!validator.isURL(videoData.url)) {
            throw new Error('Invalid video URL')
        }
        return this.videoModel.findByIdAndUpdate(id, videoData, { new: true })
    }

    async delete(id: string): Promise<void> {
        await this.videoModel.findByIdAndDelete(id)
    }
}
