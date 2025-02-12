import axios from "axios";
import { useEffect, useContext, useState } from "react";
import AppointmentContext from "../contexts/AppointmentContext";
import AppointmentForm from "./AppointmentForm";

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
    <div className="appointments-container">
      <h1>Appointments</h1>
      <button className="add-appointment-btn" onClick={() => setAddAppointment(!addAppointment)}>Add Appointment</button>
      {addAppointment && <AppointmentForm />}
      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="appointment-item"
          >
            <p>{appointment.date}</p>
            {/* <p>{appointment.time}</p>
            <p>{appointment.doctor}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
