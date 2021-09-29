import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";
import api from "../utils/api";
import { auth, getContent } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoAuthPopupOpen, setIsInfoAuthPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentCard, setCurrentCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [authInfoImageClass, setAuthInfoImageClass] = useState("");
  const [authInfoCaption, setAuthInfoCaption] = useState("");
  const [registerStatus, setRegisterStatus] = useState(0);
  const [email, setEmail] = useState("");
  let appHistory = useHistory();

  function renderLoading(isLoading) {
    setIsSubmitting(isLoading);
  }
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getCards(), api.getUserInfo()])
        .then((data) => {
          const [initialCards, userInfo] = data;
          setCards(initialCards);
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, card.likes, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete() {
    api
      .deleteCard(currentCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== currentCard._id));
        setCurrentCard([]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleUpdateUser(info) {
    api
      .sendProfileDataToServer(info.name, info.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleUpdateAvatar(info) {
    api
      .changeAvatar(info.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleAddPlaceSubmit(info) {
    api
      .addNewCardToServer(info.name, info.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleRegisterSubmit(email, password) {
    auth(email, password, "signup")
      .then((res) => {
        setRegisterStatus(res.status);
        if (res.ok) {
          handleInfoAuthClick(true);
          setAuthInfoImageClass("popup__image_status_success");
          setAuthInfoCaption("Вы успешно зарегистрировались!");
          return res.json();
        } else {
          handleInfoAuthClick(true);
          setAuthInfoImageClass("popup__image_status_error");
          setAuthInfoCaption("Что-то пошло не так! Попробуйте ещё раз.");
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((res) => res)
      .catch(() => {
        handleInfoAuthClick(true);
        setAuthInfoImageClass("popup__image_status_error");
        setAuthInfoCaption("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  function closeInfoToolTipPopup() {
    setIsInfoAuthPopupOpen(false);
    if (registerStatus === 201) {
      appHistory.push("/sign-in");
    } else if (registerStatus === 200) {
      handleLogin(true);
      appHistory.push("/");
    }
  }

  function handleLoginSubmit(email, password) {
    auth(email, password, "signin")
      .then((res) => {
        setRegisterStatus(res.status);
        if (res.ok) {
          handleInfoAuthClick(true);
          setAuthInfoImageClass("popup__image_status_success");
          setAuthInfoCaption("Вы успешно вошли!");
          return res.json();
        } else {
          handleInfoAuthClick(true);
          setAuthInfoImageClass("popup__image_status_error");
          setAuthInfoCaption("Что-то пошло не так! Попробуйте ещё раз.");
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then(() => {
        setEmail(email);
      })
      .catch(() => {
        handleInfoAuthClick(true);
        setAuthInfoImageClass("popup__image_status_error");
        setAuthInfoCaption("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  function handleLogin(isLogged) {
    setLoggedIn(isLogged);
  }

  useEffect(() => {
    getContent()
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          appHistory.push("/");
          setEmail(res.data.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [appHistory]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }

  function handleInfoAuthClick() {
    setIsInfoAuthPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
  }

  function handleCurrentCard(card) {
    setCurrentCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsSubmitting(false);
    setIsInfoAuthPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/sign-in">
            <Login loggedIn={loggedIn} onLogin={handleLoginSubmit} />
          </Route>
          <Route path="/sign-up">
            <Register loggedIn={loggedIn} onRegister={handleRegisterSubmit} />
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn}>
            <Header userEmail={email} handleLogin={handleLogin} />
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onDeleteCardClick={handleDeleteCardClick}
              onCurrentCard={handleCurrentCard}
            />
            <Footer />
          </ProtectedRoute>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onRenderLoading={renderLoading}
        isSubmitting={isSubmitting}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onRenderLoading={renderLoading}
        isSubmitting={isSubmitting}
      />

      <DeleteCardPopup
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
        onRenderLoading={renderLoading}
        isSubmitting={isSubmitting}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onRenderLoading={renderLoading}
        isSubmitting={isSubmitting}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoToolTip
        isOpen={isInfoAuthPopupOpen}
        onClose={closeInfoToolTipPopup}
        authInfoImageClass={authInfoImageClass}
        authInfoCaption={authInfoCaption}
      />
    </CurrentUserContext.Provider>
  );
}
export default App;
