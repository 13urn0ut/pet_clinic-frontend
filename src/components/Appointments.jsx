import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import AppointmentContext from "../contexts/AppointmentContext";
import AppointmentForm from "./AppointmentForm";
import AppointmentCard from "./AppointmentCard";
// import handleError from "../utils/handleError";

const API_URL = import.meta.env.VITE_API_URL;

const Appointments = () => {
  const { appointments, setAppointments } = useContext(AppointmentContext);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [addAppointment, setAddAppointment] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    sortBy: "",
    confirmed: "",
  });
  const { showBoundary } = useErrorBoundary();

  const changeSortBY = (e) => {
    setFilter({ ...filter, sortBy: e.target.value, page: 1 });
  };

  const changeConfirmed = (e) => {
    setFilter({ ...filter, confirmed: e.target.value, page: 1 });
  };

  const queryStr =
    "?" +
    Object.entries(filter)
      // eslint-disable-next-line no-unused-vars
      .filter(([key, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data: result } = await axios.get(
          `${API_URL}/appointments${queryStr}`,
          {
            withCredentials: true,
          }
        );

        setAppointments(result.data);
        setTotalAppointments(result.results);
      } catch (err) {
        showBoundary(err);
      }
    };

    fetchAppointments();
    setAddAppointment(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [filter]);

  return (
    <div className="appointments-container">
      <h1>Appointments</h1>
      <button
        className="add-appointment-btn"
        onClick={() => setAddAppointment(!addAppointment)}
      >
        Add Appointment
      </button>
      {addAppointment && <AppointmentForm />}
      <div className="filter-sort">
        <select
          name="sortBy"
          id="sortBy"
          onChange={changeSortBY}
        >
          <option value="">Sort By</option>
          <option value="date">Date</option>
          <option value="confirmed">Confirmed</option>
          <option value="rating">Rating</option>
        </select>

        <select
          name="confirmed"
          id="confirmed"
          onChange={changeConfirmed}
        >
          <option value="">Filter By</option>
          <option value="true">Confirmed</option>
          <option value="false">Unconfirmed</option>
        </select>
      </div>

      <div className="appointments-list">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setFilter({ ...filter, page: filter.page - 1 })}
          disabled={filter.page === 1}
        >
          {"<<"}
        </button>
        <span>
          page {filter.page} of {Math.ceil(totalAppointments / filter.limit)}
        </span>
        <button
          onClick={() => setFilter({ ...filter, page: filter.page + 1 })}
          disabled={filter.page > totalAppointments / filter.limit}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Appointments;
