import { useState } from "react"
import Index from "./components/Index"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return <Index isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
}
