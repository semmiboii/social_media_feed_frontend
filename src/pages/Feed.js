import { useLoaderData } from "react-router-dom";
import Posts from "../components/posts";

export default function Feed() {
  const posts = useLoaderData();
  return posts.length !== 0 && <Posts posts={posts} />;
}

export async function loader({ request, params }) {
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`);
  const data = await response.json();

  if (!response.ok) {
    throw new Response("Success", { status: 200 });
  } else {
    return data;
  }
}
