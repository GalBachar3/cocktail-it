import axios from 'axios';

const getToken = () => localStorage.getItem('token');
export const getRefreshToken = () => localStorage.getItem("refreshToken");

const client =  axios.create({
    baseURL: 'http://localhost:3000/'
});

const unauthenticatedClient =  axios.create({
    baseURL: 'http://localhost:3000/'
});

client.interceptors.request.use((config) => {
    config.headers["Authorization"] = `bearer ${getToken()}`;
    config.headers["Content-type"] = 'application/json'
    return config;
  });
  

client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error?.config;
      if (axios.isCancel(error) || (/*error.response.status === 401 &&*/ originalRequest.url === "/auth/refresh")) {
        return Promise.reject(error);
      }
  
      if (/*error.response.status === 401 &&*/ !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await unauthenticatedClient.get("/auth/refresh", {
            headers: {
              Authorization: `Bearer ${getRefreshToken()}`,
            },
          });
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          unauthenticatedClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return client(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );

export const getClient = () => client

export const getUnauthenticatedClient = () => unauthenticatedClient

