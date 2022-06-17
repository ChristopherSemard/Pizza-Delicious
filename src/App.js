import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import About from "./components/About";
import Contact from "./components/Contact";
import Policy from "./components/Policy";
import NavBar from "./components/NavBar";
import HomeScreen from "./screens/HomeScreen";
import Cart from "./components/Cart";

function App() {
    return (
        <BrowserRouter>
            <TopBar />
            <NavBar />
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Policy" element={<Policy />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
