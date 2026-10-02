import './index.css'
// 1. HashRouter вместо BrowserRouter
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavPanel/NavPanel.jsx";
import Main from "./pages/MainPage.jsx";
import Key from "./pages/KeyPage.jsx";
import SpeciesListItemPage from "./pages/SpeciesListPage.jsx";
import AfterwordPage from "./pages/AfterwordPage.jsx";
import Header from "./components/Header/Header.jsx";
import MorphologyPage from "./pages/MorphologyPage.jsx";
import LiteraturePage from "./pages/LiteraturePage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { useState } from "react";
import ContactForm from "./components/ContactForm/ContactForm.jsx";

function App() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <HashRouter>
            <Header />
            <Navbar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/morphology" element={<MorphologyPage />} />
                <Route path="/key" element={<Key />} />
                <Route path="/species-list" element={<SpeciesListItemPage />} />
                <Route path="/afterword" element={<AfterwordPage />} />
                <Route path="/literature" element={<LiteraturePage />} />
            </Routes>

            {/* Перенесите блок сюда, чтобы он был частью дерева Router */}
            <div>
                <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
                <Footer onOpenForm={() => setIsFormOpen(true)} />
            </div>
        </HashRouter>
    );
}


export default App;
