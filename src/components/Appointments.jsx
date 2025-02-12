import axios from "axios";
import { useEffect, useContext, useState } from "react";
import AppointmentContext from "../contexts/AppointmentContext";
import AppointmentForm from "./AppointmentForm";
import AppointmentCard from "./AppointmentCard";

const API_URL = import.meta.env.VITE_API_URL;

const Appointments = () => {
  const { appointments, setAppointments } = useContext(AppointmentContext);
  const [addAppointment, setAddAppointment] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data: result } = await axios.get(`${API_URL}/appointments`, {
          withCredentials: true,
        });

        setAppointments(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAppointments();
    setAddAppointment(false);
  }, []);

  return (
    <div className="appointments-container w-max mx-auto">
      <h1>Appointments</h1>
      <button
        className="add-appointment-btn"
        onClick={() => setAddAppointment(!addAppointment)}
      >
        Add Appointment
      </button>
      {addAppointment && <AppointmentForm />}
      <div className="appointments-list flex flex-col gap-5 w-max mx-auto mt-4">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

export default Appointments;
