import { useLoaderData, useNavigate } from "react-router-dom";
import User from "../components/user";

export default function UserPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.setItem("isAuthenticated", false);
    navigate("/login");
  };

  const user = useLoaderData();

  return <User handleClick={handleClick} user={user} />;
}

export async function loader({ request, params }) {
  const userId = sessionStorage.getItem("userId");

  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`
  );
  const data = await res.json();

  return data;
}
