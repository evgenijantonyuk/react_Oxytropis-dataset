import herbLogo from '../../assets/herb-logo/logoHerb.png'


const HerbLogo = () => {

    return (
        <div>
            <a href="#">
                <img className="logo__asu" src={herbLogo} alt="Лого АлтГУ"/>
            </a>
        </div>
    );
};

export default HerbLogo;