import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import About from './pages/About'
import Test from './pages/Test'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from "react-router"




function App() {

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <div className="hero">
                <Hero />
              </div>
            }
          />
          <Route path="login/" element={<Login />} />
          <Route path="register/" element={<Register />} />
          <Route path="about/" element={<About />} />
          <Route path="Test/" element={<Test />} />
        </Routes>
        <Footer className="relative bottom-0 w-full" />
      </BrowserRouter>
    </>
  );
}

export default App
