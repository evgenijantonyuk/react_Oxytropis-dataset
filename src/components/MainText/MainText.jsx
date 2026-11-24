
import './MainText.css'
import MainTextHeader from './MainTextHeader'
import MountCountryMap from "../MountCountryMap/MountCountryMap.jsx"
import ButtonUp from "../ButtonUp/ButtonUp.jsx"
import OxytropisLifeForms from "../OxytropisLifeForms/OxytropisLifeForms.jsx"


const MainText = () => {
    return (
       <>
           <div className="container">
               <MainTextHeader />
               <OxytropisLifeForms />
               <MountCountryMap />
               <ButtonUp />
           </div>
       </>
    );
};

export default MainText;