import PopupWithForm from "./PopupWithForm";

function DeleteConfirmPopup(props) {
  function submitDelete(e) {
    e.preventDefault();
    props.onSubmit(props.deleteCard);
  }
  return (
    <PopupWithForm
      name="confirmDelete"
      title="Вы уверены?"
      isOpened={props.isOpened}
      onClose={props.onClose}
      buttonText={props.buttonText}
      onOverlay={props.onOverlay}
      isValid={true}
      onSubmit={submitDelete}
    ></PopupWithForm>
  );
}

export default DeleteConfirmPopup;
