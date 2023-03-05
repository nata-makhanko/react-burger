import styles from "./profile.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { patchProfile, logout } from "../services/actions/auth";
import { NavLink } from "react-router-dom";

import { useForm } from "../hooks/useForm";

type TAuthState = {
  user: {
    email?: string,
    name?: string
  }
}

const Profile = () => {
  const { values, setValues } = useForm({});

  const [disabled, setDisabled] = useState(true);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const { user }: TAuthState = useSelector((state: any) => state.auth);

  useEffect(() => {
    setDisabledBtn(false);
    if (user?.name && user?.email) {
      setValues({ ...values, email: user.email, name: user.name });
    }
  }, [user]);

  const handleClearForm = (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    if (user?.name && user?.email) {
      setValues({
        ...values,
        name: user.name,
        email: user.email,
        password: "",
      });
    } else {
      setValues({ ...values, name: "", email: "", password: "" });
    }
  };

  const handleSaveForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        values.name !== user?.name ||
        values.email !== user?.email ||
        values.password !== ""
      ) {
        dispatch(patchProfile({ ...values }) as any);
      }
    },
    [values.name, values.email, values.password]
  );

  const onBlur = () => {
    setDisabled(true);
  };

  const handleIconClick = () => {
    setDisabled(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleLogOut = () => {
    dispatch(logout() as any);
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
        <form onSubmit={(e) => handleSaveForm(e)}>
          <Input
            disabled={disabled}
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            icon={"EditIcon"}
            value={values.name ? values.name : ""}
            onIconClick={handleIconClick}
            extraClass="mb-6"
            ref={inputRef}
            onBlur={onBlur}
          />
          <EmailInput
            name={"email"}
            placeholder="Логин"
            isIcon={true}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            value={values.email ? values.email : ""}
            extraClass="mb-6"
          />
          <PasswordInput
            name={"password"}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            value={values.password ? values.password : ""}
            icon="EditIcon"
            extraClass="mb-6"
          />
          <div className={styles.btns}>
            <Button
              htmlType="reset"
              type="secondary"
              size="medium"
              onClick={(e) => handleClearForm(e)}
            >
              Отменить
            </Button>
            <Button
              disabled={disabledBtn}
              htmlType="submit"
              type="primary"
              size="medium"
            >
              Сохранить
            </Button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default Profile;
