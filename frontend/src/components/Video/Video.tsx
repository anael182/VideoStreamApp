import { Container } from "@mui/material"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Video } from "../../types"

interface VideoProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export default function VideoList(props: VideoProps) {
  const { setIsLoggedIn } = props
  const { id } = useParams()
  const navigate = useNavigate()
  const [videoId] = useState(id)
  const [videoInfo, setVideoInfo] = useState<Video | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token")
        const { data } = await axios.get(`/api/video?id=${videoId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        setVideoInfo(data)
      } catch {
        setIsLoggedIn(false)
        navigate("/")
      }
    }
    fetchData()
  }, [videoId, navigate, setIsLoggedIn])
  if (!videoInfo) return null
  return (
    <Container>
      <Grid item xs={12} md={12} marginTop={2}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: 1 }}>
              <video autoPlay controls width="200">
                <source src={`/api/video/${videoId}`} type="video/mp4" />
              </video>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
      <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="primary">
            Created by:{videoInfo.createdBy.fullname}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" color="primary">
            Created: {videoInfo.uploadDate}
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography variant="h5">{videoInfo.title}</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}
