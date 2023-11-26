import PostForm from "../components/post-form";

export default function CreatePost() {
  return <PostForm />;
}

export async function loader({ request, params }) {
  const userId = sessionStorage.getItem("userId");

  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/user/${userId}`
  );
  const data = await res.json();

  if (!res.ok) {
    throw new Response("Something went wrong", { status: 404 });
  } else {
    return data;
  }
}
