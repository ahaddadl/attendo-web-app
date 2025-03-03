import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import * as AttendoApi from "../../../services/api-service.js"
import { useAuthContext } from "../../../contexts/auth-context.jsx";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    try {
      user = await AttendoApi.login(user);
      login(user);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        const { data } = error.response;
        Object.keys(data.errors).forEach((inputName) =>
          setError(inputName, { message: data.errors[inputName] })
        );
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="input-group mb-1">
          <span className="input-group-text">
            <i className="fa fa-user fa-fw"></i>
          </span>
          <input
            type="email"
            autoComplete="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="user@example.org"
            {...register("email", { required: "Mandatory field" })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email.message}</div>
          )}
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-lock fa-fw"></i>
          </span>
          <input
            type="password"
            utoComplete="current-password"
            className={`form-control ${errors.password ? "is-invalid" : ""} `}
            placeholder="****"
            {...register("password", { required: "Mandatory field" })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password.message}</div>
          )}
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
