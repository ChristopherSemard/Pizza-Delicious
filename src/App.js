import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import About from "./components/About";
import Contact from "./components/Contact";
import Policy from "./components/Policy";
import NavBar from "./components/NavBar";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import Login from "./components/Login";
import OrderScreen from "./screens/OrderScreen";
import RequireAuth from "./components/RequireAuth";

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
                <Route path="/Cart" element={<CartScreen />} />
                <Route path="/Login" element={<Login />} />

                <Route path="/Order" element={<OrderScreen />} />
                {/* <Route element={<RequireAuth />}>
                    <Route path="/Order" element={<OrderScreen />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
