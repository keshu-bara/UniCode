import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Auth from "./components/Auth/Auth";
import About from "./pages/About";
import Test from "./pages/Test";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Ai from "./pages/Ai";
import { Analytics } from "@vercel/analytics/react"; //Corrected here

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow mb-1">
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
              <Route path="Ai/" element={<Ai />} />
              <Route path="DashBoard/" element={<DashBoard />} />
            </Routes>
            <Analytics /> {/* ✅ Correct placement and import */}
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
