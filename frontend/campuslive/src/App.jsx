import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Auth from "./components/Auth/Auth";
import About from "./pages/About";
import Test from "./pages/Test";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router"; // Fix import
import DashBoard from "./pages/DashBoard";
import Ai from "./pages/Ai";
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mb-1">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/test" element={<Test />} />
            <Route path="/ai" element={<Ai />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Analytics debug={false} />
    </BrowserRouter>
  );
}

export default App;
