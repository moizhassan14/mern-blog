import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Projects from "./pages/Project";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./pages/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import IsAdminPrivateRoute from "./pages/IsAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/sign-in" element={<Signin/>} />
        <Route path="/sign-up" element={<Signup/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route  element={<PrivateRoute/>} >
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
        <Route  element={<IsAdminPrivateRoute/>} >
          <Route path="/create-post" element={<CreatePost/>} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
