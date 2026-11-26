import herbLogo from '../../assets/herb-logo/logoHerb.png'
import './HerbLogo.css'


const HerbLogo = () => {

    return (
        <div>
            <a href="#">
                <img className="herb__logo" src={herbLogo} alt="Лого Гербария"/>
            </a>
        </div>
    );
};

export default HerbLogo;