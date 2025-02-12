import { useForm } from "react-hook-form";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const AppointmentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const createAppointment = async (data) => {
    try {
      const { data: result } = await axios.post(
        `${API_URL}/appointments`,
        {
          pet_name: data.pet_name,
          date: data.date,
          time: data.time,
          notes: data.notes,
          email: user.email,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Appointment created successfully");

      console.log(result);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      {/* <h1>AppointmentForm</h1> */}
      <form onSubmit={handleSubmit(createAppointment)} className="form">
        <div>
          <label htmlFor="pet_name">Pet Name</label>
          <input
            type="text"
            id="pet_name"
            {...register("pet_name", { required: "Pet name is required" })}
          />
          <p className="form-error">{errors.pet_name?.message}</p>
        </div>

        <div>
          <label htmlFor="first_name">Owner First Name</label>
          <input
            type="text"
            id="first_name"
            {...register("first_name", { required: "First name is required" })}
            defaultValue={user?.first_name}
          />
          <p className="form-error">{errors.first_name?.message}</p>
        </div>

        <div>
          <label htmlFor="last_name">Owner Last Name</label>
          <input
            type="text"
            id="last_name"
            {...register("last_name", { required: "Last name is required" })}
            defaultValue={user?.last_name}
          />
          <p className="form-error">{errors.last_name?.message}</p>
        </div>

        <div className="date-time">
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              {...register("date", { required: "Date is required" })}
            />
            <p className="form-error">{errors.date?.message}</p>
          </div>

          <div>
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              {...register("time", { required: "Time is required" })}
              min="09:00"
              max="17:00"
              step="1800"
            />
            <p className="form-error">{errors.time?.message}</p>
          </div>
        </div>

        <div>
          <label htmlFor="notes">Description</label>
          <textarea id="notes" {...register("notes")} />
          <p className="form-error">{errors.notes?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
