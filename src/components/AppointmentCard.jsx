import axios from "axios";
import { useContext, useState } from "react";
// import { useNavigate } from "react-router";
import UserContext from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const AppointmentCard = ({ appointment }) => {
  const { user } = useContext(UserContext);
//   const navigate = useNavigate();
  const [currentAppointment, setCurrentAppointment] = useState(appointment);

  const confirmAppointment = async () => {
    try {
      const { data: result } = await axios.patch(
        `${API_URL}/appointments/${appointment.id}`,
        { confirmed: !currentAppointment.confirmed },
        {
          withCredentials: true,
        }
      );

      console.log(result);

      setCurrentAppointment(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="appointment-card border-2 p-4 rounded-2xl">
      <div className="appointment-card__details flex gap-10 sm:gap-40 md:gap-60 lg:gap-80">
        <div>
          <h2>{currentAppointment.pet_name}</h2>
          <p>
            Owner: {currentAppointment.first_name} {currentAppointment.last_name}
          </p>
          <p>Notes: {currentAppointment.notes}</p>
        </div>
        <div>
          <p>
            {new Date(currentAppointment.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
          <p>
            {new Date(currentAppointment.date).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
          </p>
          <p>
            {currentAppointment.confirmed ? "confirmed" : "not confirmed"}
          </p>
        </div>
      </div>
      <hr className="my-3" />
      <div className="appointment-card__controls flex justify-between">
        <button>edit</button>
        {user.role === "admin" && <button onClick={confirmAppointment}>confirm</button>}
        <button>delete</button>
      </div>
    </div>
  );
};

export default AppointmentCard;
