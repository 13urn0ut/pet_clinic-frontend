import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const AppointmentCard = ({ appointment }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="appointment-card border-2 p-4 rounded-2xl">
      <div className="appointment-card__details flex gap-10 sm:gap-40 md:gap-60 lg:gap-80">
        <div>
          <h2>{appointment.pet_name}</h2>
          <p>
            Owner: {appointment.first_name} {appointment.last_name}
          </p>
          <p>Notes: {appointment.notes}</p>
        </div>
        <div>
          <p>
            {new Date(appointment.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
          <p>
            {new Date(appointment.date).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
          </p>
        </div>
      </div>
      <hr className="my-3" />
      <div className="appointment-card__controls flex justify-between">
        {user.role === "admin" && <button>confirm</button>}
        <button>edit</button>
        <button>delete</button>
      </div>
    </div>
  );
};

export default AppointmentCard;
