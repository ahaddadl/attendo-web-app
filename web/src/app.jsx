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
        <Route path="/events/:eventId" element={<PrivateRoute><EventAttendance /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<PrivateRoute><RegisterPage /></PrivateRoute>} />
        <Route path="/participants" element={<PrivateRoute><Participants /></PrivateRoute>} />
        <Route
          path="/participants/:participantId"
          element={<PrivateRoute><ParticipantProfile /></PrivateRoute>}
        />
         <Route path="/events/:eventId/add-participant" element={<PrivateRoute><AddParticipantForm /></PrivateRoute>} />
         <Route path="/attendances/:attendanceId/" element={<PrivateRoute><AttendanceCard /></PrivateRoute>} />
         <Route path="events/create-event" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
