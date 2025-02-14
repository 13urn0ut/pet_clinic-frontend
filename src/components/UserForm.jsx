import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useErrorBoundary } from "react-error-boundary";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import UserContext from "../contexts/UserContext";
// import handleError from "../utils/handleError";

const API_URL = import.meta.env.VITE_API_URL;

const UserForm = ({ action }) => {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const { showBoundary } = useErrorBoundary();

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async (data) => {
    try {
      const { data: result } = await axios.post(
        `${API_URL}/users/${action}`,
        data,
        {
          withCredentials: true,
        }
      );    

      setUser(result.data);
      toast.success(`Welcome ${result.data.first_name}`);
      // throw new Error("xxxwertyu");
      navigate("/appointments");
    } catch (err) {
      console.log(err);
      
      showBoundary(err);
    }
  };

  useEffect(() => {
    reset();
    clearErrors();
    setPasswordVisible(false);
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
            <span onClick={togglePassword} id="toggle-password" className="">
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
