import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { starLoginEmailPassword, startGoogleLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { setError, RemoveError } from "../../actions/ui";

export const LoginScreen = () => {
  const { msgError, loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(starLoginEmailPassword(email, password));
    }
    // dispatch(starLoginEmailPassword (email,password))
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError("Email invalido"));
      return false;
    } else if (!password || password.length < 6) {
      dispatch(setError("la contraseña debe tener almenos 6 caracters "));
      return false;
    }

    dispatch(RemoveError());
    return true;
  };

  const handleGoogle = () => {
    dispatch(startGoogleLogin());
  };
  const { email, password } = formValues;

  useEffect(() => {
    if (msgError) {
      setTimeout(() => {
        dispatch(RemoveError());
      }, 2000)
    }
  }, [msgError, dispatch])
  

  return (
    <>
      <h3 className="auth__title">Iniciar</h3>

      {msgError && <div className="auth__alert-error">{msgError}</div>}

      <form
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          autoComplete="off"
          value={password}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-primary btn-blok"
          type="submit"
          disabled={loading}
        >
          Iniciar
        </button>
        <div className="auth__social-networks">
          <p>Login With Social Networks</p>
          <div className="google-btn" onClick={handleGoogle}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className="link" to="/auth/register">
          Create New Account
        </Link>
      </form>
    </>
  );
};
