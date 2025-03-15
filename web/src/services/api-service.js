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

const participantsProfile = (guestId) => http.get(`/guests/${guestId}`);
const register = (user) => http.post("/users", user);
// const register = (formData) =>
//   http.post("/users", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

const login = (user) => http.post("/sessions", user);

const listEvents = ({ city, title, category, date, limit, page }) => {
  limit = Number.isNaN(Number(limit)) || Number(limit) <= 0 ? 15 : limit;
  page = Number.isNaN(Number(page)) || Number(page) <= 0 ? undefined : page;

  const params = {};

  if (city) params.city = city;
  if (title) params.title = title;
  if (category) params.category = category;
  if (date) params.date = date;
  params.limit = limit;
  params.page = page;

  console.log("Parametros: ", params);
  return http.get("/events", { params });
};

const getEvent = (eventId) => http.get(`/events/${eventId}`);

const addEvent = (event) => http.post("/events", event);

const listParticipants = ({ limit, page }) => {
  limit = Number.isNaN(Number(limit)) || Number(limit) <= 0 ? 15 : limit;
  page = Number.isNaN(Number(page)) || Number(page) <= 0 ? undefined : page;

  const params = {};

  params.limit = limit;
  params.page = page;

  return http.get("/guests", { params });
};

const addParticipant = (guest) => http.post("guests/", guest);
const updateParticipant = (guestId, guest) => http.patch(`/guests/${guestId}`, guest);

const addAttendance = (attendance) => http.post("attendances/", attendance);

const attendanceDetail = (attendanceId) =>
  http.get(`/attendances/${attendanceId}`);

const attendanceUpdate = (attendanceId, attendance) => http.patch(`/attendances/${attendanceId}`, attendance);

// const deleteEvent = (id) => http.delete(`/events/${id}`);

// export { login, listEvents, getEvent, deleteEvent, register, profile };

export {
  login,
  register,
  profile,
  getEvent,
  addEvent,
  listEvents,
  listParticipants,
  participantsProfile,
  addParticipant,
  addAttendance,
  attendanceDetail,
  attendanceUpdate,
  updateParticipant,
};
