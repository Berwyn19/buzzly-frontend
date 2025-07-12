import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import ProductForm from "./pages/ProductForm";
import NavBar from "./components/NavBar";
import Library from "./pages/Library";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<ProductForm />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </>
  );
}

export default App;
