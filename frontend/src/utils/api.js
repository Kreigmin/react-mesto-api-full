class Api {
  constructor({ baseUrl, contentType }) {
    this._baseUrl = baseUrl;
    this._contentType = contentType;
  }

  _checkResponse(res) {
    if (res.ok) {
      // response status check, if status 200 Ok => return promise
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // method which requests profile data from server and set them
  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      credentials: "include",
    }).then(this._checkResponse);
  }

  // method which requests initial data of cards
  getCards() {
    return fetch(this._baseUrl + "/cards", {
      credentials: "include",
    }).then(this._checkResponse);
  }

  signOut() {
    return fetch(this._baseUrl + "/signout", {
      method: "POST",
      credentials: "include",
    }).then(this._checkResponse);
  }

  // method which send new profile data to server
  sendProfileDataToServer(profileName, profileJob) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: profileName,
        about: profileJob,
      }),
    }).then(this._checkResponse);
  }

  // method which send new card data to server
  addNewCardToServer(cardName, cardLink) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._checkResponse);
  }

  // method which delete card
  deleteCard(idCard) {
    return fetch(this._baseUrl + "/cards/" + idCard, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": this._contentType,
      },
    }).then(this._checkResponse);
  }

  sendLikeToServer(cardId, likes) {
    return fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        likes: likes,
      }),
    }).then(this._checkResponse);
  }

  deleteLike(idCard) {
    return fetch(this._baseUrl + "/cards/" + idCard + "/likes", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": this._contentType,
      },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, likes, isLiked) {
    if (isLiked) {
      return this.sendLikeToServer(cardId, likes);
    } else {
      return this.deleteLike(cardId);
    }
  }

  changeAvatar(avatarLink) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://api.beautiful-places.nomoredomains.club",
  contentType: "application/json",
});

export default api;
