const USER_PATH = "CURRENT_USER";

const saveUser = (user) => {
  localStorage.setItem(USER_PATH, JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem(USER_PATH);
};

const getUser = () => {
  const userStringified = localStorage.getItem(USER_PATH);
  return JSON.parse(userStringified);
};

export { saveUser, removeUser, getUser };
