import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ItemListHeader from "../item-list-header/item-list-header";
import stylesHeader from "./app-header.module.css";

const AppHeader = () => {
  const paddingItems = "pt-4 pr-5 pb-4 pl-5";
  return (
    <header className={`${stylesHeader.header} pt-4 pb-4`}>
      <nav className={stylesHeader.nav}>
        <ul className={stylesHeader.list}>
          <li
            className={`${stylesHeader.item} ${paddingItems} mr-2`}
            tabIndex={1}
          >
            <ItemListHeader
              children={<BurgerIcon type="primary" />}
              value="Конструктор"
              isSelectedValue={true}
            />
          </li>
          <li className={`${stylesHeader.item} ${paddingItems}`} tabIndex={1}>
            <ItemListHeader
              children={<ListIcon type="secondary" />}
              value="Лента заказов"
              isSelectedValue={false}
            />
          </li>
        </ul>
        <Logo />
        <ul className={stylesHeader.personal}>
          <li className={`${stylesHeader.item} ${paddingItems}`} tabIndex={1}>
            <ItemListHeader
              children={<ProfileIcon type="secondary" />}
              value="Личный кабинет"
              isSelectedValue={false}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
