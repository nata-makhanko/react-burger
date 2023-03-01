import styles from "./login.module.css";
import {
  EmailInput,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/actions/auth";
import { useForm } from "../hooks/useForm";

const Login = () => {
  const { values, handleChange, setValues } = useForm({});

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.replace("/");
    }
  }, [isLoggedIn]);

  return (
    <section className={`${styles.wrp} pt-20`}>
      <form onSubmit={(e) => signIn(e)}>
        <p className={`${styles.center} text text_type_main-medium mb-6`}>
          Вход
        </p>
        <EmailInput
          name={"email"}
          isIcon={false}
          onChange={(e) => handleChange(e)}
          value={values.email ? values.email : ""}
          extraClass="mb-6"
        />
        <PasswordInput
          name={"password"}
          onChange={(e) => handleChange(e)}
          value={values.password ? values.password : ""}
          extraClass="mb-6"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          extraClass={`${styles.btn} mb-20`}
        >
          Войти
        </Button>
      </form>

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
