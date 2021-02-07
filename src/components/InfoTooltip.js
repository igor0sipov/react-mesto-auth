import React from "react";
import authErrorPicPath from "../images/auth-error.svg";
import authSuccessPicPath from "../images/auth-success.svg";

function InfoTooltip(props) {
  React.useEffect(() => {
    document.addEventListener("keydown", props.escClosing);
    return () => {
      document.removeEventListener("keydown", props.escClosing);
    };
  }, []);

  const statusText = {
    success: "Вы успешно зарегестрировались",
    error: "Что-то пошло не так! Попробуйте ещё раз.",
  };

  return (
    <section
      className={`popup ${props.isOpened.state && `popup_opened`}`}
      onClick={props.onOverlay}
    >
      <div className="popup__content container">
        <button
          type="button"
          className="popup__close-icon"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__status-pic"
          src={props.isOpened.status ? authSuccessPicPath : authErrorPicPath}
          alt="Статус авторизации"
        />
        <p className="popup__status-text">
          {props.isOpened.status ? statusText.success : statusText.error}
        </p>
      </div>
    </section>
  );
}

export default InfoTooltip;
