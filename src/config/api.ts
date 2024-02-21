import axios from "axios";

export const api = (token?: string) => {
  let connection;

  if (token) {
    return (connection = axios.create({
      baseURL: "https://almox-system.vercel.app",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }));
  }

  connection = axios.create({
    baseURL: "https://almox-system.vercel.app",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return connection;
};
