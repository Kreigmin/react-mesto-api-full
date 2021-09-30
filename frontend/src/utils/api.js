class Api {
  constructor({ baseUrl, authorization, contentType }) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
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
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }

  // method which requests initial data of cards
  getCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        authorization: this._authorization,
      },
    }).then(this._checkResponse);
  }

  // method which send new profile data to server
  sendProfileDataToServer(profileName, profileJob) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
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
      headers: {
        authorization: this._authorization,
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
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then(this._checkResponse);
  }

  sendLikeToServer(cardId, likes) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        likes: likes,
      }),
    }).then(this._checkResponse);
  }

  deleteLike(idCard) {
    return fetch(this._baseUrl + "/cards/likes/" + idCard, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
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
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://api.beautiful-places.nomoredomains.club",
  authorization: "d4c6f8c0-4eea-4fc7-88ea-b49bfd0af7e6",
  contentType: "application/json",
});

export default api;
