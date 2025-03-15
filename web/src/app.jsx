import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  EventAttendance,
  ParticipantDetail,
  Participants,
} from "./pages";
import PrivateRoute from "./guards/private-route";
import NavBar from "./components/ui/navbar/navbar";
import ParticipantProfile from "./components/participants/participant-profile";
import AddParticipantForm from "./components/participants/participant-add-form";
import AttendanceCard from "./components/attendance/attendance-card";
import CreateEvent from "./components/events/event-create/event-create";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/events/:eventId" element={<EventAttendance />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/participants" element={<Participants />} />
        <Route
          path="/participants/:participantId"
          element={<ParticipantProfile />}
        />
         <Route path="/events/:eventId/add-participant" element={<AddParticipantForm />} />
         <Route path="/attendances/:attendanceId/" element={<AttendanceCard />} />
         <Route path="events/create-event" element={<CreateEvent />} />
      </Routes>
    </>
  );
}

export default App;
