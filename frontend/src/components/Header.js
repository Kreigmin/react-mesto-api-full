import React, { useState } from "react";
import { Link, Route, Switch } from "react-router-dom";

function Header({ userEmail, handleSignOut }) {
  const [isClicked, setIsClicked] = useState(false);
  const menuActiveClass = `menu__container ${isClicked ? "menu_active" : ""}`;
  const menuBlockActiveClass = `menu__hamburger ${
    isClicked ? "menu__hamburger_active" : ""
  }`;
  const menuHamburgerBtnClass = `menu__hamburger-btn ${
    isClicked ? "menu__hamburger-btn_active" : ""
  }`;

  function hamburgerClick() {
    setIsClicked(!isClicked);
  }
  return (
    <>
      <div className={menuBlockActiveClass}></div>
      <header className="header">
        <div className="header__container">
          <a className="header__logo" href="#" target="_self"></a>
          <nav className="menu">
            <Switch>
              <Route exact path="/">
                <button
                  className={menuHamburgerBtnClass}
                  onClick={hamburgerClick}
                ></button>
                <div className={menuActiveClass}>
                  <p className="menu__email">{userEmail}</p>
                  <Link
                    to="sign-in"
                    className="menu__btn"
                    onClick={handleSignOut}
                  >
                    Выйти
                  </Link>
                </div>
              </Route>
              <Route path="/sign-up">
                <Link to="sign-in" className="menu__btn">
                  Войти
                </Link>
              </Route>
              <Route path="/sign-in">
                <Link to="sign-up" className="menu__btn">
                  Регистрация
                </Link>
              </Route>
            </Switch>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
