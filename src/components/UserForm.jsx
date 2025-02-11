import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const UserForm = ({ action }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    clearErrors();
  }, [action]);

  return (
    <div className="form">
      {action === "signup" ? <h1>Sign Up</h1> : <h1>Log In</h1>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {action === "signup" && (
          <div>
            <label htmlFor="first_name">First Name</label>
            <input
              {...register("first_name", {
                required: "First name is required",
              })}
              type="text"
              id="first_name"
              name="first_name"
            />
            <p className="form-error">{errors.first_name?.message}</p>
          </div>
        )}

        {action === "signup" && (
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input
              {...register("last_name", { required: "Last name is required" })}
              type="text"
              id="last_name"
            />
            <p className="form-error">{errors.last_name?.message}</p>
          </div>
        )}

        <div>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            id="email"
          />
          <p className="form-error">{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              {...register("password", { required: "Password is required" })}
              type={passwordVisible ? "text" : "password"}
              id="password"
            />
            <span
              onClick={togglePassword}
              id="toggle-password"
              className=""
            >
              {!passwordVisible ? (
                <IoEyeOutline className="password-icon" />
              ) : (
                <IoEyeOffOutline className="password-icon" />
              )}
            </span>
          </div>
          <p className="form-error">{errors.password?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
      {action === "signup" ? (
        <div className="form-message">
          <p>Already have an account?</p>
          <Link to="/login">Login</Link>
        </div>
      ) : (
        <div className="form-message">
          <p>Don&apos;t have an account?</p>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </div>
  );
};

export default UserForm;
