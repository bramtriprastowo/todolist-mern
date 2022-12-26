import React, { Fragment, useState } from "react";
import styles from "./Signup.module.css";
import wavingHand from "../assets/waving-hand.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [data, setData] = useState({
    name: "",
    phone: 0,
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    setData((a) => {
      return type === "number"
        ? { ...a, [name]: Number(value) }
        : { ...a, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, username, password } = data;
    if (!name || !phone || !email || !username || !password) {
      alert("All fields are required!");
    } else {
      axios
        .post(import.meta.env.VITE_BASE_URL + "/users/register", {
          name,
          phone,
          email,
          username,
          password
        })
        .then((res) => {
          console.log(res);
          alert("Akun berhasil ditambahkan!");
          window.location.reload();
        })
        .catch((error) => console.log(error));
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
                <label htmlFor="name" className={`form-label ${styles.fs13}`}>
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your name"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="phone number"
                  className={`form-label ${styles.fs13}`}
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="+62 ..."
                  id="phoneNumber"
                  name="phone"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className={`form-label ${styles.fs13}`}>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@mail.com"
                  id="email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className={`form-label ${styles.fs13}`}
                >
                  Username
                </label>
                <input
                  type="username"
                  className="form-control"
                  placeholder="Your username"
                  id="username"
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
                Sign Up
              </button>
            </form>
            <p className={`mt-4 text-center ${styles.fs13}`}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default Signup;
