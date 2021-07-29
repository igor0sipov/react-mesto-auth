import React from "react";
import { Link, withRouter } from "react-router-dom";

function Register(props) {
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    email: { value: "" },
    password: { value: "" },
    name: { value: "" },
    about: { value: "" },
    avatar: { value: "" },
  });

  function handleInputChange(e) {
    props.setValues(inputs, setInputs, e);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit(
      {
        email: inputs.email.value,
        password: inputs.password.value,
        name: inputs.name.value === "" ? undefined : inputs.name.value,
        about: inputs.about.value === "" ? undefined : inputs.about.value,
        avatar: inputs.avatar.value === "" ? undefined : inputs.avatar.value,
      },
      props
    );
  }

  React.useEffect(() => {
    if (inputs.email.isValid && inputs.password.isValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    inputs.email.isValid,
    inputs.password.isValid,
    inputs.name.isValid,
    inputs.about.isValid,
    inputs.avatar.isValid,
  ]);

  return (
    <section className="auth sizer">
      <h1 className="auth__type">Регистрация</h1>
      <form className="auth__form" onSubmit={handleSubmit} noValidate>
        <input
          name="email"
          className="auth__input"
          type="email"
          placeholder="Email"
          onChange={handleInputChange}
          minLength="2"
          maxLength="30"
          required
          value={inputs.email.value}
        />
        <span
          className={`auth__input-error ${
            inputs.email.isValid ? `` : `auth__input-error_visible`
          }`}
        >
          {inputs.email.validationMessage}
        </span>
        <input
          name="password"
          className="auth__input"
          type="password"
          placeholder="Пароль"
          autoComplete="on"
          onChange={handleInputChange}
          minLength="2"
          maxLength="30"
          required
          value={inputs.password.value}
        />
        <span
          className={`auth__input-error ${
            inputs.password.isValid ? `` : `auth__input-error_visible`
          }`}
        >
          {inputs.password.validationMessage}
        </span>

        <input
          name="name"
          className="auth__input"
          type="text"
          placeholder="Имя"
          autoComplete="on"
          onChange={handleInputChange}
          minLength="2"
          maxLength="32"
          value={inputs.name.value}
        />
        <span
          className={`auth__input-error ${
            inputs.name.isValid ? `` : `auth__input-error_visible`
          }`}
        >
          {inputs.name.validationMessage}
        </span>

        <input
          name="about"
          className="auth__input"
          type="text"
          placeholder="О себе"
          autoComplete="on"
          onChange={handleInputChange}
          minLength="2"
          maxLength="32"
          value={inputs.about.value}
        />
        <span
          className={`auth__input-error ${
            inputs.about.isValid ? `` : `auth__input-error_visible`
          }`}
        >
          {inputs.about.validationMessage}
        </span>

        <input
          name="avatar"
          className="auth__input"
          type="url"
          placeholder="Ссылка на аватар"
          autoComplete="on"
          onChange={handleInputChange}
          minLength="2"
          maxLength="1024"
          value={inputs.avatar.value}
        />
        <span
          className={`auth__input-error ${
            inputs.avatar.isValid ? `` : `auth__input-error_visible`
          }`}
        >
          {inputs.avatar.validationMessage}
        </span>

        <button
          type="submit"
          className={`auth__button ${
            isFormValid ? "" : `auth__button_disabled`
          }`}
        >
          Зарегистрироваться
        </button>
        <Link className="auth__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
}

export default withRouter(Register);
