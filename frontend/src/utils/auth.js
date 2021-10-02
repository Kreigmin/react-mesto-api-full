const BASE_URL = "https://api.beautiful-places.nomoredomains.club/";

export function auth(email, password, endPoint) {
  return fetch(`${BASE_URL}${endPoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export function getContent() {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
