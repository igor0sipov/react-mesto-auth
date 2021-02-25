import React from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    email: { value: "" },
    password: { value: "" },
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
  }, [inputs.email.isValid, inputs.password.isValid]);

  return (
    <section className="auth sizer">
      <h1 className="auth__type">Вход</h1>
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
        <button
          type="submit"
          className={`auth__button ${
            isFormValid ? "" : `auth__button_disabled`
          }`}
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default withRouter(Login);
