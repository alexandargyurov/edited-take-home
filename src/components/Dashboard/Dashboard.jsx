import { useContext } from "react";
import { AuthContext } from "../../App";

import "./Dashboard.css";
import { Button } from "../Button/Button";

export function Dashboard() {
  const userState = useContext(AuthContext);
  const [user, setUser] = userState;

  return (
    <div className="dashboardContainer">
      <p>Hello, {user.email}!</p>
      <Button onClick={() => setUser(undefined)}>Logout</Button>
    </div>
  );
}
