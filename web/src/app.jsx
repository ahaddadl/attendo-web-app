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
          element={<ParticipantDetail />}
        />
      </Routes>
    </>
  );
}

export default App;
