import axios from 'axios';

const getToken = () => localStorage.getItem('token');

const client =  axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Content-type': 'application/json',
        Authorization: `bearer ${getToken()}`
    }
});

const unauthenticatedClient =  axios.create({
    baseURL: 'http://localhost:3000/api/'
});

// client.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       if (axios.isCancel(error)) {
//         return Promise.reject(error);
//       }
  
//       const originalRequest = error.config;
//       if (
//         error.response.status === 401 &&
//         originalRequest.url === "/auth/refresh"
//       ) {
//         return Promise.reject(error);
//       }
  
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           const response = await apiClient.get("/auth/refresh", {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
//             },
//           });
//           document.cookie = `access_token=${response.data.accessToken}; path=/`;
//           document.cookie = `refresh_token=${response.data.refreshToken}; path=/`;
//           apiClient.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${response.data.accessToken}`;
//           return apiClientWithAuth(originalRequest);
//         } catch (error) {
//           return Promise.reject(error);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );

export const getClient = () => client

export const getUnauthenticatedClient = () => unauthenticatedClient

