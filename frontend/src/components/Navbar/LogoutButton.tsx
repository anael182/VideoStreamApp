import LogoutIcon from "@mui/icons-material/Logout"
import IconButton from "@mui/material/IconButton"
import { useNavigate } from "react-router-dom"

interface LogoutButtonProps {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export default function LogoutButton(props: LogoutButtonProps) {
  const { isLoggedIn, setIsLoggedIn } = props
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate("/")
  }
  if (!isLoggedIn) return null
  return (
    <IconButton onClick={handleLogout} aria-label="logout" sx={{ ml: 2 }}>
      <LogoutIcon sx={{ color: "white" }} />
    </IconButton>
  )
}
