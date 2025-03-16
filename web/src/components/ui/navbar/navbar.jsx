import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth-context.jsx";

function NavBar() {
  const { user, logout } = useAuthContext();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
      <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/attendo.svg"
            alt="Attendo Favicon"
            style={{ width: "32px", height: "32px", marginRight: "8px" }}
          />
          Attendo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-nav"
          aria-controls="main-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                <i className="fa fa-calendar me-1"></i> Events
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/participants"
              >
                <i className="fa fa-users me-1"></i>Participants
              </Link>
            </li>
            {user?.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active text-primary fw-bold text-uppercase"
                    aria-current="page"
                    to="events/create-event"
                  >
                    <i className="fa fa-plus-circle me-1"></i>New Event
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active text-primary fw-bold text-uppercase"
                    aria-current="page"
                    to="/register"
                  >
                    <i className="fa fa-user-plus me-1"></i> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/profile">
                    {user.email}
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-danger"
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
