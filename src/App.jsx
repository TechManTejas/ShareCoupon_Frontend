import { useEffect } from "react";
import { useState } from "react"
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Chat from "./Pages/Chat";

const unauthenticatedRoutes = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
    </Routes>
  )
}

const authenticatedRoutes = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/chat" element={<Chat/>}/>
    </Routes>
  )
}

function App() {

  const [routes, setRoutes] = useState(unauthenticatedRoutes)

  useEffect(() => {
    if (localStorage.getItem("share-coupon-access-token"))
      setRoutes(() => authenticatedRoutes)
    else
      setRoutes(() => unauthenticatedRoutes)
  }, [])

  return (
    <BrowserRouter>
      {typeof routes === "function" && routes()}
    </BrowserRouter>
  )
}

export default App
