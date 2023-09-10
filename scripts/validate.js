function showInputError (formElement, inputElement, options) {
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorMessage.textContent = inputElement.validationMessage;
  errorMessage.classList.add(options.errorClass);
}

function hideInputError (formElement, inputElement, options) {
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorMessage.textContent.reset;
  errorMessage.classList.remove(options.errorClass);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid)
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(formElement, inputElement, options);
  }
    hideInputError(formElement, inputElement, options);
}

function disableButton(submitButton, options) {
  submitButton.classList.add(options.inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, options) {
  submitButton.classList.remove(options.inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputElements, submitButton, options) {
  if (hasInvalidInput(inputElements)) {
    disableButton(submitButton, options)
    return
  }
   enableButton(submitButton, options)
}

function setEventListeners(formElement, options) {
  const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
  const submitButton = formElement.querySelector(".modal__button");
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options)
    })
  })
}

function enableValidation(options) {
  const formElements = Array.from(document.querySelectorAll(options.formSelector))
  formElements.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

enableValidation(config);
