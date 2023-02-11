import styles from "./register.module.css";
import {
  EmailInput,
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/actions/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { isUserLoaded } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const checkIn = () => {
    dispatch(register({ email: email, password: password, name: name }));
  };

  useEffect(() => {
    if (isUserLoaded) {
      history.replace("/");
    }
  }, [isUserLoaded]);

  return (
    <section className={`${styles.wrp} pt-20`}>
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
        htmlType="button"
        type="primary"
        size="large"
        extraClass={`${styles.btn} mb-20`}
        onClick={checkIn}
      >
        Зарегистрироваться
      </Button>
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
