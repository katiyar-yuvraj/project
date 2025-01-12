import { createContext, useState } from "react";

// const host = process.env.REACT_APP_HOST;
// i used localhost to set authtoken  but for this i also able to use this
const StudentContext = createContext();
const StudentProvider  = ({ children }) => {
  const [User, setUser] = useState(null); // TODO: use it like a user object

  return (
    <StudentContext.Provider value={{ User, setUser }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContext;
export { StudentProvider  };
