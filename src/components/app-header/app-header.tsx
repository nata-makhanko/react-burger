import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./app-header.module.css";

type TAuthState = {
  isUserLoaded: boolean, 
  user: {
    email?: string,
    name?: string,
  }
}

const AppHeader = () => {
  const { isUserLoaded, user }: TAuthState = useSelector((state: any) => state.auth);
  const location = useLocation();

  const paddingItems = "pt-4 pr-5 pb-4 pl-5";
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <NavLink
            to="/"
            exact
            activeClassName={styles.active}
            className="text_color_inactive"
          >
            <li className={`${styles.item} ${paddingItems} mr-2`} tabIndex={1}>
              <BurgerIcon
                type={location.pathname === "/" ? "primary" : "secondary"}
              />
              <span className="text text_type_main-default ml-2 ml-2">
                Конструктор
              </span>
            </li>
          </NavLink>
          <NavLink
            to="/feed"
            activeClassName={styles.active}
            className="text_color_inactive"
          >
            <li className={`${styles.item} ${paddingItems}`} tabIndex={1}>
              <ListIcon
                type={location.pathname === "/feed" ? "primary" : "secondary"}
              />
              <span className="text text_type_main-default ml-2 ml-2">
                Лента заказов
              </span>
            </li>
          </NavLink>
        </ul>
        <NavLink to="/" exact>
          <Logo />
        </NavLink>
        <ul className={styles.personal}>
          <NavLink
            to="/profile"
            activeClassName={styles.active}
            className="text_color_inactive"
          >
            <li className={`${styles.item} ${paddingItems}`} tabIndex={1}>
              <ProfileIcon
                type={
                  location.pathname === "/profile" ||
                  location.pathname === "/login"
                    ? "primary"
                    : "secondary"
                }
              />
              <span className="text text_type_main-default ml-2 ml-2">
                {isUserLoaded && user?.name ? user.name : "Личный кабинет"}
              </span>
            </li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
