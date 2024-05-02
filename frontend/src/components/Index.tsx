import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./Auth/SignIn"
import SignUp from "./Auth/SignUp"
import Header from "./Navbar/Header"
import Video from "./Video/Video"
import VideoList from "./Video/VideoList"

interface IndexProps {
  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
}

export default function Index(props: IndexProps) {
  const { isLoggedIn, setIsLoggedIn } = props
  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn ? (
        <Routes>
          <Route
            path="/video"
            element={<VideoList setIsLoggedIn={setIsLoggedIn} />}
          ></Route>
          <Route
            path="/video/:id"
            element={<Video setIsLoggedIn={setIsLoggedIn} />}
          ></Route>
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
          ></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      )}
    </BrowserRouter>
  )
}
