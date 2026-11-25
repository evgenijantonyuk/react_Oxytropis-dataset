import './index.css';
import { useState, useCallback, lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Navbar from "./components/NavPanel/NavPanel.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Main from "./pages/MainPage.jsx";

// Ленивая загрузка второстепенных страниц
const MorphologyPage = lazy(() => import("./pages/MorphologyPage.jsx"));
const Key = lazy(() => import("./pages/KeyPage.jsx"));
const SpeciesListItemPage = lazy(() => import("./pages/SpeciesListPage.jsx"));
const AfterwordPage = lazy(() => import("./pages/AfterwordPage.jsx"));
const LiteraturePage = lazy(() => import("./pages/LiteraturePage.jsx"));

// Ленивая загрузка модального окна
const ContactForm = lazy(() => import("./components/ContactForm/ContactForm.jsx"));

// Простой индикатор загрузки при переключении разделов
const PageLoader = () => (
    <div style={{ textAlign: "center", padding: "40px 20px", color: "#4a6572" }}>
        Загрузка раздела...
    </div>
);

function App() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOpenForm = useCallback(() => setIsFormOpen(true), []);
    const handleCloseForm = useCallback(() => setIsFormOpen(false), []);

    return (
        <HashRouter>
            <Header />
            <Navbar />

            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/morphology" element={<MorphologyPage />} />
                    <Route path="/key" element={<Key />} />
                    <Route path="/species-list" element={<SpeciesListItemPage />} />
                    <Route path="/afterword" element={<AfterwordPage />} />
                    <Route path="/literature" element={<LiteraturePage />} />
                </Routes>
            </Suspense>

            <div>
                {isFormOpen && (
                    <Suspense fallback={null}>
                        <ContactForm isOpen={isFormOpen} onClose={handleCloseForm} />
                    </Suspense>
                )}
                <Footer onOpenForm={handleOpenForm} />
            </div>
        </HashRouter>
    );
}

export default App;
