import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Auth from './components/Auth/Auth'
import About from './pages/About'
import Test from './pages/Test'
import Footer from './components/Footer'
import { BrowserRouter, Route, Routes } from "react-router"




function App() {

  return (
    <>
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
          <Route path="auth/" element={<Auth />} />
          <Route path="about/" element={<About />} />
          <Route path="Test/" element={<Test />} />
        </Routes>
        <Footer className="relative bottom-0 w-full" />
      </BrowserRouter>
    </>
  );
}

export default App
