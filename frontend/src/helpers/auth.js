const getToken = () => {
  return localStorage.getItem("TOKEN");
};

const setToken = (token) => {
  localStorage.setItem("TOKEN", token);
};

const getUsername = () => {
  return localStorage.getItem("USERNAME");
};

const setUsername = (username) => {
  localStorage.setItem("USERNAME", username);
};

const isLoggedIn = () => {
  if (getToken() == null) return false;
  return true;
};

export { getToken, setToken, getUsername, setUsername, isLoggedIn };
