import './Footer.css'

const Footer = ({ onOpenForm }) => {
    return (
        <footer className="footer">
            {/* При клике вызывается функция открытия формы из App.jsx */}
            <button className="contacts-button" onClick={onOpenForm}>
                Написать
            </button>
        </footer>
    );
};

export default Footer;
