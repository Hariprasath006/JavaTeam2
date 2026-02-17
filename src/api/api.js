const BASE_URL = "http://localhost:8080/api";

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

export const getResources = async () => {
  const res = await fetch(`${BASE_URL}/resources`);
  return res.json();
};
