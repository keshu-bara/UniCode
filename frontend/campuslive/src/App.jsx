import Header from './components/Header'
import Hero from './components/Hero'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import About from './pages/About'
import Test from './pages/Test'
import { BrowserRouter, Route, Routes } from "react-router"




function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="login/" element={<Login />} />
          <Route path="register/" element={<Register />} />
          <Route path="about/" element={<About />} />
          <Route path = "Test/" element= {<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
