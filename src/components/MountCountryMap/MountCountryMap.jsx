
import './MountCountryMap.css'

const MountCountryMap = () => {
    return (
        <div className="container">
            <img className="ags__map" src="images/ags-map/AGS_map_reg-1_2.jpg" alt=""/>
            <p className="ags__title">
                <a href="http://altaiflora.asu.ru/ru/%d0%ba%d0%b0%d1%80%d1%82%d0%b0-%d0%b0%d0%b3%d1%81/"
                   target="_blank">Схема
                    ботанико&ndash;географического районирования Алтайской горной страны по Р.В. Камелину (2005),
                    выполненная в WP Google Maps (Vaganov, Shmakov, Gudkova, 2019).
                </a>
            </p>
        </div>
    );
};

export default MountCountryMap;