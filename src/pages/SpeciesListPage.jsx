
import SpeciesList from "../components/SpeciesList/SpeciesList.jsx";
import '../App.css'


function SpeciesListPage() {
    return (
        <>
            <SpeciesList/>
            <footer className="footer footer__afterword">
                <p>&#169; Антонюк Е. В.</p>
                <p className="footer__text">
                    Если есть замечания или вопросы, а так же предложения о сотрудничестве обрайтесь по элекронной
                    почте:
                    <a className="contacts-button" target="_blank"
                       href="mailto:evgenijantonyuk@gmail.com?subject=Вопрос&body=Привет">evgenijantonyuk@gmail.com</a>
                </p>
            </footer>
        </>
    )
}

export default SpeciesListPage;