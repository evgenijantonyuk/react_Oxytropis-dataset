import './LogoUsbs.css'
import logoUsbs from '../../assets/logoUsbs/logo-usbs-new.png'

function LogoUsbs() {
    return (
        <div className="asu-usbs">
            <span className="logo__text">Южно&ndash;Сибирский<br/> ботанический<br/> сад</span>
            <a className="asu-usbs_link" href="http://ssbg.asu.ru/" target="_blank">
                <img className="logo__usbs" src={logoUsbs} alt="Лого ЮСБС"/></a>
        </div>
    )
}

export default LogoUsbs;