import styles from "./login.module.css";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, getProfile } from "../../services/actions/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, authauthorized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const emptyUser = Object.keys(user).length === 0;

  const signIn = () => {
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (authauthorized) {
      dispatch(getProfile());
    }
  }, [authauthorized]);

  useEffect(() => {
    if (!emptyUser) {
      history.replace("/");
    }
  }, [emptyUser]);

  return (
    <section className={`${styles.wrp} pt-20`}>
      <p className={`${styles.center} text text_type_main-medium mb-6`}>Вход</p>
      <EmailInput
        name={"email"}
        isIcon={false}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        extraClass="mb-6"
      />
      <PasswordInput
        name={"password"}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        extraClass="mb-6"
      />
      <Button
        htmlType="button"
        type="primary"
        size="large"
        extraClass={`${styles.btn} mb-20`}
        onClick={signIn}
      >
        Войти
      </Button>
      <p
        className={`${styles.center} mb-4 text text_type_main-default text_color_inactive`}
      >
        Вы - новый пользователь?
        <Link to="/register">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pl-1 pr-1 pb-1 pt-1"
          >
            Зарегистрироваться
          </Button>
        </Link>
      </p>
      <p
        className={`${styles.center} text text text_type_main-default text_color_inactive`}
      >
        Забыли пароль?
        <Link to="/forgot-password">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pl-1 pr-1 pb-1 pt-1"
          >
            Восстановить пароль
          </Button>
        </Link>
      </p>
    </section>
  );
};

export default Login;
