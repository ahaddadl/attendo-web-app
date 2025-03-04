import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

const profile = () => http.get("/users/me");

const register = (user) => http.post("/users", user);
// const register = (formData) =>
//   http.post("/users", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

const login = (user) => http.post("/sessions", user);

// const listEvents = ({ city, limit, page, lat, lng }) => {
//   limit = Number.isNaN(Number(limit)) || Number(limit) <= 0 ? 1 : limit;
//   page = Number.isNaN(Number(page)) || Number(page) <= 0 ? undefined : page;

//   lat =
//     Number.isNaN(Number(lat)) || !(Number(lat) >= -90 && Number(lat) <= 90)
//       ? undefined
//       : lat;
//   lng =
//     Number.isNaN(Number(lng)) || !(Number(lng) >= -180 && Number(lng) <= 180)
//       ? undefined
//       : lng;

//   return http.get("/events", { params: { city, limit, page, lat, lng } });
// };

 const getEvent = (eventId) => http.get(`/events/${eventId}`);

// const deleteEvent = (id) => http.delete(`/events/${id}`);

// export { login, listEvents, getEvent, deleteEvent, register, profile };

export { login, register, profile, getEvent };
