const initialCards = [
  {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
},

{
  name: "Lake Louise",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
},

{
  name: "Bald Mountains",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
},

{
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
},

{
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
},

{
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
},
];

/* Elements */

const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal');
const addCardModal = document.querySelector('#add-card-modal');
const imagePreviewModal = document.querySelector('#image-preview-modal');
const imagePreviewModalCloseButton = imagePreviewModal.querySelector('.modal__close');
const profileModalCloseButton = profileEditModal.querySelector('.modal__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileFormElement = profileEditModal.querySelector('.modal__form');
const addCardFormElement = addCardModal.querySelector('.modal__form');
const cardsListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;
const addNewCardButton = document.querySelector('.profile__add-button');
const addCardModalCloseButton = addCardModal.querySelector('.modal__close');

/* Form Data */
const nameInput = document.querySelector('#profile-name-input');
const jobInput = document.querySelector('#profile-description-input');
const cardTitleInput = document.querySelector('.modal__input_type_title');
const cardUrlInput = document.querySelector('.modal__input_type_url');


/* Functions */
function closeModal (modal) {
  modal.classList.remove('modal_opened');
}

function fillProfileForm () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function openModal(modal) {
  modal.classList.add('modal_opened');
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement (cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const modalImage = document.querySelector('.modal__image');
  const modalImageTitle = document.querySelector('.modal__image-title');

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_active');
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    openModal(imagePreviewModal);
  })


  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  modalImage.src = cardData.link;
  modalImageTitle.textContent = cardData.name;
  return cardElement;
}

/* Event Handlers */
function handleProfileSubmit (e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit (e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({name, link}, cardsListEl);
  closeModal(addCardModal);
}

/* Event Listeners */
profileEditButton.addEventListener('click', () => {
   openModal(profileEditModal);
   fillProfileForm();
  });
profileModalCloseButton.addEventListener('click', () => closeModal(profileEditModal));

// form listeners
profileFormElement.addEventListener('submit', handleProfileSubmit);
addCardFormElement.addEventListener('submit', handleAddCardSubmit);

// add new card
addNewCardButton.addEventListener('click', () => openModal(addCardModal));
addCardModalCloseButton.addEventListener('click', () => closeModal(addCardModal));

// image preview
imagePreviewModalCloseButton.addEventListener('click', () => closeModal(imagePreviewModal));


initialCards.forEach((cardData) => renderCard(cardData, cardsListEl));