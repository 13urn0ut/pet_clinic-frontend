import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../contexts/UserContext";
import AppointmentForm from "./AppointmentForm";

const API_URL = import.meta.env.VITE_API_URL;

const AppointmentCard = ({ appointment }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentAppointment, setCurrentAppointment] = useState(appointment);
  const [deleteAppointment, setDeleteAppointment] = useState(false);
  const [editAppointment, setEditAppointment] = useState(false);
  const [ratingAppointment, setRatingAppointment] = useState(false);

  const openEdit = () => {
    setEditAppointment(!editAppointment);
    setRatingAppointment(false);
    setDeleteAppointment(false);
  };

  const openRating = () => {
    setRatingAppointment(!ratingAppointment);
    setEditAppointment(false);
    setDeleteAppointment(false);
  };

  const openDelete = () => {
    setDeleteAppointment(!deleteAppointment);
    setRatingAppointment(false);
    setEditAppointment(false);
  };

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

  const rateAppointment = async (e) => {
    e.preventDefault();

    try {
      const { data: result } = await axios.patch(
        `${API_URL}/appointments/${appointment.id}`,
        { rating: e.target.rating.value },
        {
          withCredentials: true,
        }
      );

      setCurrentAppointment(result.data);
      setRatingAppointment(false);
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
        <div className="appointment-card__details flex justify-between ">
          <div>
            <h2>{currentAppointment?.pet_name}</h2>
            <p>
              Owner: {currentAppointment?.first_name}{" "}
              {currentAppointment?.last_name}
            </p>
            <p>Notes: {currentAppointment?.notes}</p>
          </div>
          <div>
            <p>
              {new Date(currentAppointment?.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <p>
              {new Date(currentAppointment?.date).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </p>
            <p>
              {currentAppointment?.confirmed ? "confirmed" : "not confirmed"}
            </p>
            <p>Rating: {currentAppointment?.rating || "not rated"}</p>
          </div>
        </div>
        <hr className="my-3" />
        <div className="appointment-card__controls flex justify-between">
          <button onClick={openEdit}>edit</button>
          {user?.role === "admin" && (
            <button onClick={confirmAppointment}>confirm</button>
          )}
          {user?.role !== "admin" &&
            currentAppointment?.confirmed &&
            new Date(currentAppointment?.date) < new Date() && (
              <button onClick={openRating}>rate</button>
            )}
          <button onClick={openDelete}>delete</button>
        </div>
      </div>
      {deleteAppointment && (
        <div className="border-2 border-red-300 p-4 rounded-2xl">
          <p className="text-center">
            Are you sure you want to cancel appointment for{" "}
            {currentAppointment?.pet_name} on{" "}
            {new Date(currentAppointment?.date).toLocaleDateString("en-US", {
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
      {editAppointment && (
        <AppointmentForm
          appointment={currentAppointment}
          setCurrentAppointment={setCurrentAppointment}
          setEditAppointment={setEditAppointment}
          action="edit"
        />
      )}

      {ratingAppointment && (
        <div className="form">
          <form onSubmit={rateAppointment}>
            <div>
              <label htmlFor="rating">Rating</label>
              <select
                className="w-100"
                name="rating"
                id="rating"
                defaultValue={currentAppointment?.rating || "1"}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button>Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default AppointmentCard;
