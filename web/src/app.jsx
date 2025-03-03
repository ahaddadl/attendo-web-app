import { Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from "./pages";
import PrivateRoute from "./guards/private-route";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
