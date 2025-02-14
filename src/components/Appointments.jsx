import axios from "axios";
import { useEffect, useContext, useState } from "react";
import AppointmentContext from "../contexts/AppointmentContext";
import AppointmentForm from "./AppointmentForm";
import AppointmentCard from "./AppointmentCard";

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

  console.log(queryStr);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data: result } = await axios.get(
          `${API_URL}/appointments${queryStr}`,
          {
            withCredentials: true,
          }
        );

        console.log(result);

        setAppointments(result.data);
        setTotalAppointments(result.results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAppointments();
    setAddAppointment(false);
  }, [filter]);

  return (
    <div className="appointments-container w-max mx-auto">
      <h1>Appointments</h1>
      <button
        className="add-appointment-btn"
        onClick={() => setAddAppointment(!addAppointment)}
      >
        Add Appointment
      </button>
      <div>
        <select name="sortBy" id="sortBy" onChange={changeSortBY}>
          <option value="">Sort By</option>
          <option value="date">Date</option>
          <option value="confirmed">Confirmed</option>
          <option value="rating">Rating</option>
        </select>

        <select name="confirmed" id="confirmed" onChange={changeConfirmed}>
          <option value="">Filter By</option>
          <option value="true">Confirmed</option>
          <option value="false">Unconfirmed</option>
        </select>
      </div>
      {addAppointment && <AppointmentForm />}
      <div className="appointments-list flex flex-col gap-5 w-max mx-auto mt-4">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
      <div className="pagination flex justify-between w-full mt-4">
        <button
          onClick={() => setFilter({ ...filter, page: filter.page - 1 })}
          disabled={filter.page === 1}
        >
          {"<<"} Previous
        </button>
        <span>
          page {filter.page} of {Math.ceil(totalAppointments / filter.limit)}
        </span>
        <button
          onClick={() => setFilter({ ...filter, page: filter.page + 1 })}
          disabled={filter.page > totalAppointments / filter.limit}
        >
          Next {">>"}
        </button>
      </div>
    </div>
  );
};

export default Appointments;
