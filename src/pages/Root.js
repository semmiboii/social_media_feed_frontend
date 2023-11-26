import Root from "../components/root";
import { redirect } from "react-router-dom";

export default function RootLayout() {
  return <Root />;
}

const getUser = async () => {
  const userId = sessionStorage.getItem("userId");

  if (userId) {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`
    );
    const data = await res.json();

    return data;
  } else {
    return null;
  }
};

export async function loader() {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  return null;
}
