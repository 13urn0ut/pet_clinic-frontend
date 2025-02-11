import axios from "axios";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: result } = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });

        setUser(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
