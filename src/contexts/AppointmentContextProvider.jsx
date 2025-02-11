import { useState } from "react";
import AppointmentContext from "./AppointmentContext";

const AppointmentContextProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  return (
    <AppointmentContext.Provider value={{ appointments, setAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContextProvider;
