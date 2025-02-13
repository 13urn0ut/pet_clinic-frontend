import { useForm } from "react-hook-form";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

const AppointmentForm = ({
  appointment,
  setCurrentAppointment,
  setEditAppointment,
  action,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useContext(UserContext);
  // const [action, setAction] = useState(action)
  const navigate = useNavigate();

  // console.log(setCurrentAppointment);
  console.log(action);
  // console.log(new Date(appointment?.date).toLocaleDateString("lt"));

  const editAppointment = async (data) => {
    try {
      const { data: result } = await axios.patch(
        `${API_URL}/appointments/${appointment.id}`,
        {
          pet_name: data.pet_name,
          date: data.date,
          time: data.time,
          notes: data.notes,
          // email: user.email,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Appointment edited successfully");

      console.log(result);
      setCurrentAppointment(result.data);
      setEditAppointment(false);
    } catch (err) {
      console.log(err);
    }
  };

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
      <form
        onSubmit={
          action === "edit"
            ? handleSubmit(editAppointment)
            : handleSubmit(createAppointment)
        }
        className="form"
      >
        <div>
          <label htmlFor="pet_name">Pet Name</label>
          <input
            type="text"
            id="pet_name"
            {...register("pet_name", { required: "Pet name is required" })}
            defaultValue={appointment?.pet_name}
          />
          <p className="form-error">{errors.pet_name?.message}</p>
        </div>

        <div>
          <label htmlFor="first_name">Owner First Name</label>
          <input
            type="text"
            id="first_name"
            {...register("first_name", { required: "First name is required" })}
            defaultValue={appointment?.first_name || user?.first_name}
          />
          <p className="form-error">{errors.first_name?.message}</p>
        </div>

        <div>
          <label htmlFor="last_name">Owner Last Name</label>
          <input
            type="text"
            id="last_name"
            {...register("last_name", { required: "Last name is required" })}
            defaultValue={appointment?.last_name || user?.last_name}
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
              defaultValue={new Date(appointment?.date).toLocaleDateString(
                "lt"
              )}
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
              defaultValue={new Date(appointment?.date).toLocaleTimeString(
                "lt",
                {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                }
              )}
            />
            <p className="form-error">{errors.time?.message}</p>
          </div>
        </div>

        <div>
          <label htmlFor="notes">Description</label>
          <textarea
            id="notes"
            {...register("notes")}
            defaultValue={appointment?.notes}
          />
          <p className="form-error">{errors.notes?.message}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
