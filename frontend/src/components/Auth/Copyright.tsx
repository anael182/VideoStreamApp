import { Typography } from "@mui/material"
import Link from "@mui/material/Link"

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 4, mb: 4 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/anael182/VideoStreamApp/">
        StreamApp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
