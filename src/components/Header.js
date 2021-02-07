import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const currentLocation = useLocation().pathname;
  return (
    <header className="header header_spaced">
      <Link className="header__logo" to="/"></Link>
      <div className="header__user-menu">
        {props.loggedIn ? (
          <>
            <p className="header__email">{props.currentEmail}</p>
            <button className="header__button" onClick={props.handleSignOut}>
              Выход
            </button>
          </>
        ) : currentLocation === "/sign-up" ? (
          <Link className="header__link" to="/sign-in">
            Вход
          </Link>
        ) : (
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
