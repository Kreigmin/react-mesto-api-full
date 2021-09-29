const BASE_URL = "https://api.beautiful-places.nomoredomains.club/";

export function auth(email, password, endPoint) {
  return fetch(`${BASE_URL}${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export function getContent() {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
