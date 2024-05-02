export interface Video {
  id: number
  title: string
  video: string
  coverImage: string
  uploadDate: string
  createdBy: User
}

export interface User {
  id: number
  fullname: string
  email: string
  password: string
  createdDate: string
}
