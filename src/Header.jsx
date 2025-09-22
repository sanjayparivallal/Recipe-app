import chefMyIcon from '/chef-My-icon.png';

const Header = () => {
    return (
        <header>
            <div className="header__logo">
                <img
                    src={chefMyIcon}
                    alt="Recipe App Icon" className="header__logo-image" />
                <span className="header__logo-text">
                    Recipe App
                </span>
            </div>
        </header>
    )
}

export default Header;