import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../contexts/UserContext";
import AppointmentForm from "./AppointmentForm";
// import handleError from "../utils/handleError";
import { useErrorBoundary } from "react-error-boundary";

const API_URL = import.meta.env.VITE_API_URL;

const AppointmentCard = ({ appointment }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentAppointment, setCurrentAppointment] = useState(appointment);
  const [deleteAppointment, setDeleteAppointment] = useState(false);
  const [editAppointment, setEditAppointment] = useState(false);
  const [ratingAppointment, setRatingAppointment] = useState(false);

  const { showBoundary } = useErrorBoundary();

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
      // const error = handleError(err);
      showBoundary(err);
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
      showBoundary(err);
    }
  };

  const cancelAppointment = async () => {
    try {
      await axios.delete(`${API_URL}/appointments/${appointment.id}`, {
        withCredentials: true,
      });

      navigate(0);
    } catch (err) {
      // const error = handleError(err);
      showBoundary(err);
    }
  };

  return (
    <>
      <div className="appointment-card">
        <div className="appointment-card__details">
          <div>
            <h2>{currentAppointment?.pet_name}</h2>
            <p>
              Owner: {currentAppointment?.first_name}{" "}
              {currentAppointment?.last_name}
            </p>
            <p className="notes">Notes: {currentAppointment?.notes}</p>
          </div>
          <div className="appointment-card__info">
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
        <div className="appointment-card__controls">
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
        <div className="confirm-delete">
          <p className="confirm-delete__message">
            Are you sure you want to cancel appointment for{" "}
            {currentAppointment?.pet_name} on{" "}
            {new Date(currentAppointment?.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
            ?
          </p>
          <div className="confirm-delete__controls">
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
