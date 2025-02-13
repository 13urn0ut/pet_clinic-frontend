import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const AppointmentCard = ({ appointment }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentAppointment, setCurrentAppointment] = useState(appointment);
  const [deleteAppointment, setDeleteAppointment] = useState(false);
  const [editAppointment, setEditAppointment] = useState(false);

  const confirmAppointment = async () => {
    try {
      const { data: result } = await axios.patch(
        `${API_URL}/appointments/${appointment.id}`,
        { confirmed: !currentAppointment.confirmed },
        {
          withCredentials: true,
        }
      );

      setCurrentAppointment(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelAppointment = async () => {
    try {
      await axios.delete(`${API_URL}/appointments/${appointment.id}`, {
        withCredentials: true,
      });

      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="appointment-card border-2 p-4 rounded-2xl">
        <div className="appointment-card__details flex gap-10 sm:gap-40 md:gap-60 lg:gap-80">
          <div>
            <h2>{currentAppointment.pet_name}</h2>
            <p>
              Owner: {currentAppointment.first_name}{" "}
              {currentAppointment.last_name}
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
          <button onClick={() => setEditAppointment(true)}>edit</button>
          {user.role === "admin" && (
            <button onClick={confirmAppointment}>confirm</button>
          )}
          <button onClick={() => setDeleteAppointment(true)}>delete</button>
        </div>
      </div>
      {deleteAppointment && (
        <div className="border-2 border-red-300 p-4 rounded-2xl">
          <p className="text-center">
            Are you sure you want to cancel appointment for{" "}
            {appointment.pet_name} on{" "}
            {new Date(currentAppointment.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
            ?
          </p>
          <div className="flex gap-6 justify-center mt-4">
            <button onClick={() => setDeleteAppointment(false)}>No</button>
            <button onClick={cancelAppointment}>Yes</button>
          </div>
        </div>
      )}
      {editAppointment && <h1>kill</h1>}
    </>
  );
};

export default AppointmentCard;
