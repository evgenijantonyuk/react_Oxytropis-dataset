
import './LogoAsu.css'
import logoAsu from '../../assets/logoAsu/logo_Asu.png';


function LogoAsu() {

    return (
        <div>
            <div className="asu-usbs">
                <a className="asu-usbs_link" href="https://www.asu.ru/" target="_blank">
                    <img className="logo__asu" src={logoAsu} alt="Лого АлтГУ"/></a>
                <span className="logo__text">Алтайский<br/> государственный<br/> университет</span>
            </div>
        </div>
    )
}

export default LogoAsu;