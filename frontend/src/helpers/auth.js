import { getToken } from "../services/authService";

const authHeaders = () => {
  const token = getToken();
  return { Authorization: "Bearer " + token };
};

export { authHeaders };
