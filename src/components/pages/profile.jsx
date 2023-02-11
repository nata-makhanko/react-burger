import styles from "./profile.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { patchProfile, logout } from "../../services/actions/auth";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const inputRef = useRef(null);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.name && user?.email) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleClearForm = () => {
    if (user?.name && user?.email) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName("");
      setEmail("");
    }
    setPassword("");
  };

  const changeInputs = (value, setter) => {
    setDisabledBtn(false);
    setter(value);
  };

  const handleSaveForm = useCallback(() => {
    if (name !== user?.name || email !== user?.email || password !== "") {
      dispatch(patchProfile({ name, email, password }));
    }
  }, [name, email, password]);

  const onBlur = () => {
    setDisabled(true);
  };

  const handleIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current.focus(), 0);
  };

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <section className={`${styles.wrp} pt-20`}>
      <section className={`${styles.nav} mr-15`}>
        <ul className={`${styles.list} pb-20`}>
          <NavLink
            exact
            to="/profile"
            className="text text_type_main-medium pt-4 pb-4 text_color_inactive"
            activeClassName={styles.active}
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className="text text_type_main-medium pt-4 pb-4 text_color_inactive"
            activeClassName={styles.active}
          >
            История заказов
          </NavLink>
          <NavLink
            to="/profile/logout"
            className="text text_type_main-medium pt-4 pb-4 text_color_inactive"
            activeClassName={styles.active}
            onClick={handleLogOut}
          >
            Выход
          </NavLink>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section>
      <section className={styles.inputs}>
        <Input
          disabled={disabled}
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => changeInputs(e.target.value, setName)}
          icon={"EditIcon"}
          value={name}
          onIconClick={handleIconClick}
          extraClass="mb-6"
          ref={inputRef}
          onBlur={onBlur}
        />
        <EmailInput
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          onChange={(e) => changeInputs(e.target.value, setEmail)}
          value={email}
          extraClass="mb-6"
        />
        <PasswordInput
          name={"password"}
          onChange={(e) => changeInputs(e.target.value, setPassword)}
          value={password}
          icon="EditIcon"
          extraClass="mb-6"
        />
        <div className={styles.btns}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleClearForm}
          >
            Отменить
          </Button>
          <Button
            disabled={disabledBtn}
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleSaveForm}
          >
            Сохранить
          </Button>
        </div>
      </section>
    </section>
  );
};

export default Profile;
