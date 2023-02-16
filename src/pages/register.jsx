import styles from "./register.module.css";
import {
  EmailInput,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../services/actions/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const checkIn = (e) => {
    e.preventDefault();
    dispatch(register({ email: email, password: password, name: name }));
  };

  return (
    <section className={`${styles.wrp} pt-20`}>
      <form onSubmit={(e) => checkIn(e)}>
        <p className={`${styles.center} text text_type_main-medium mb-6`}>
          Регистрация
        </p>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          extraClass="mb-6"
        />
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
          htmlType="submit"
          type="primary"
          size="large"
          extraClass={`${styles.btn} mb-20`}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p
        className={`${styles.center} mb-4 text text_type_main-default text_color_inactive`}
      >
        Уже зарегистрированы?
        <Link to="/login">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pl-1 pr-1 pb-1 pt-1"
          >
            Войти
          </Button>
        </Link>
      </p>
    </section>
  );
};

export default Register;
