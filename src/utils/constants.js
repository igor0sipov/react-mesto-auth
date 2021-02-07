export const myId = "86dbbabbe99c68a05ddfc98c";

export const apiConfig = {
  token: "fe948c7b-c7fe-4065-b9c1-1b820e5df7d7",
  userProfileUrl: "https://mesto.nomoreparties.co/v1/cohort-17/users/me/",
  cardsUrl: "https://mesto.nomoreparties.co/v1/cohort-17/cards/",
};

export const validationSelectors = {
  input: ".popup__input",
  submitButton: ".popup__submit-button",
  inactiveButton: "popup__submit-button_disabled",
  inputError: "popup__input_type_error",
  errorVisible: "popup__input-error_visible",
};

export const cardSelectors = {
  cardTemplate: ".card-template",
  card: ".element",
  picture: ".element__picture",
  title: ".element__name",
  likeButton: ".element__like-button",
  likeButtonActive: "element__like-button_active",
  deleteButton: ".element__delete-button",
  hiddenDeleteButton: "element__delete-button_hidden",
  likeCounter: ".element__like-counter",
};

export const popupSelectors = {
  openedPopup: "popup_opened",
  closeButton: ".popup__close-icon",
  title: "popup__title",
  picture: ".popup__picture",
  input: ".popup__input",
  submitButton: ".popup__submit-button",
  caption: ".popup__caption",
};
