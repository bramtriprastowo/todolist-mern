import React, { Fragment, useState } from "react";
import styles from "./Login.module.css";
import wavingHand from "../assets/waving-hand.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((a) => {
      return { ...a, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = data;
    if (!username || !password) {
      alert("All fields are required!");
    } else {
      axios
        .post(import.meta.env.VITE_BASE_URL + "/users/login", {
          username,
          password,
        })
        .then((res) => {
          console.log(res);
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.accessToken}`;
        })
        .catch((error) => {
          if(error.response.data.status === "Not found") {
            alert("User not found! Check your username!");
          } else if(error.response.data.status === "Unauthorized") {
            alert("Login failed! Check your password!");
          }
        });
    }
  };

  return (
    <Fragment>
      <div className={`d-flex ${styles.container}`}>
        <figure>
          <div className={`${styles.figureContainer}`}>
            <svg className={`${styles.svg1}`} />
            <svg className={`${styles.svg2}`} />
            <h1>TO DO</h1>
            <h1>LIST</h1>
          </div>
        </figure>
        <main className={`position-absolute ${styles.main}`}>
          <div className={`${styles.mainContainer}`}>
            <h2 className={`${styles.fs20}`}>
              Welcome to To Do List{" "}
              <img src={wavingHand} alt="waving hand icon" width="24px" />
            </h2>
            <p className={`mb-5 ${styles.fs13}`}>
              Please sign-in to your account, and start manage further
            </p>
            <h2 className={`${styles.fs20} mb-3`}>Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className={`form-label ${styles.fs13}`}
                >
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Your registered username"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`form-label ${styles.fs13}`}
                >
                  Password
                </label>
                <div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="*****"
                    id="password"
                    name="password"
                    onChange={handleChange}
                  />
                  <i
                    className={
                      `fa position-absolute ${styles.eyePassword} ` +
                      (showPassword ? "fa-eye" : "fa-eye-slash")
                    }
                    aria-hidden="true"
                    onClick={togglePassword}
                  ></i>
                </div>
              </div>
              <button
                type="submit"
                className={`btn btn-primary w-100 py-2 ${styles.mt40} ${styles.fs14}`}
              >
                Sign in
              </button>
            </form>
            <p className={`mt-4 text-center ${styles.fs13}`}>
              Don't have an account yet? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default Login;
