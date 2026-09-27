
import './Header.css';
import LogoAsu from "../LogoAsu/LogoAsu.jsx";
import LogoUsbs from "../LogoUsbs/LogoUsbs.jsx";
import HerbLogo from "../HerbLogo/HerbLogo.jsx";

export default function Header() {
    return (
        <header className="header">
            <div className="logo__block">
                <LogoAsu />
                <HerbLogo />
                <LogoUsbs />
            </div>
        </header>
    );
}
