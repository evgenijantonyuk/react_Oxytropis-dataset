import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavPanel/NavPanel.jsx";
import Main from "./pages/MainPage.jsx";
import Key from "./pages/KeyPage.jsx";
import SpeciesListItemPage from "./pages/SpeciesListPage.jsx";
import AfterwordPage from "./pages/AfterwordPage.jsx";
import Header from "./components/Header/Header.jsx";
import MorphologyPage from "./pages/MorphologyPage.jsx";


function App() {

    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Header />
            <Navbar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/morphology" element={<MorphologyPage />} />
                <Route path="/key" element={<Key />} />
                <Route path="/species-list" element={<SpeciesListItemPage />} />
                <Route path="/afterword" element={<AfterwordPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
