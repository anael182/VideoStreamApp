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
        const { data } = await axios.get(`api/video`, {
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
        {videos.map((video: Video) => {
          return (
            <Grid item xs={12} md={4} key={video._id}>
              <CardActionArea component="div">
                <Link
                  to={`/video/${video._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card sx={{ display: "flex", minHeight: 250 }}>
                    <CardContent sx={{ flex: 1 }}>
                      <Typography component="h2" variant="h5">
                        {video.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Uploaded at {video.uploadDate}
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      sx={{ width: 160, display: { xs: "none", sm: "block" } }}
                      image={`api/${video.coverImage}`}
                      alt="alt"
                    />
                  </Card>
                </Link>
              </CardActionArea>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
