import { Container } from "@mui/material"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Video } from "../../types"

interface VideoListProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export default function VideoList(props: VideoListProps) {
  const { setIsLoggedIn } = props
  const [videos, setVideos] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token")
        const { data } = await axios.get("/api/video", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        setVideos(data)
      } catch {
        setIsLoggedIn(false)
        navigate("/")
      }
    }
    fetchData()
  }, [navigate, setIsLoggedIn])
  return (
    <Container>
      <Grid container spacing={2} marginTop={2}>
        {videos.map((video: Video, index) => {
          return (
            <Grid item xs={12} md={4} key={video.id}>
              <CardActionArea component="a" href="#">
                <Card key={index} sx={{ display: "flex" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      <Link
                        to={`/video/${video.id}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {video.title}
                      </Link>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {video.uploadDate}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 160,
                      height: 200,
                    }}
                    image={`${video.coverImage}`}
                    alt={`Image du film: ${video.title}`}
                  />
                </Card>
              </CardActionArea>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
