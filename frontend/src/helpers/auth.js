import { currentUserValue } from "../services/authService";

const authHeaders = () => {
  const token = currentUserValue().token;
  return { Authorization: "Bearer " + token };
};

export { authHeaders };
