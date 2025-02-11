import axios from "axios";
import { useEffect, useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";

const API_URL = import.meta.env.VITE_API_URL;

const Appointments = () => {
  const { appointments, setAppointments } = useContext(AppointmentContext);

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
  }, []);

  return (
    <div className="appointments-container">
      <h1>Appointments</h1>
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
