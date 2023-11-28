import Post from "./post";
import { useQuery } from "react-query";

import "./user.scss";

export default function User({ user, handleClick }) {
  const getPosts = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/post/${user._id}`
      );
      const data = await res.json();
      return data;
    },
    queryKey: ["user_posts", "post"],
  });

  const { isLoading, data: posts, isSuccess } = getPosts;
  console.log(posts);

  return (
    <div className="user_wrapper">
      <div className="user_username">
        <h3>username - {user?.username}</h3>
      </div>
      <div className="user_name">
        <h3>name - {user.name}</h3>
      </div>
      <div className="user_email">
        <h3>email - {user?.email}</h3>
      </div>
      <div className="user_posts">
        {user && !isLoading && isSuccess && posts?.length !== 0 ? (
          posts?.map((post) => (
            <Post
              key={post._id}
              author={post.author}
              title={post.title}
              description={post.description}
              timestamp={post.timestamp}
              post={post}
            />
          ))
        ) : (
          <h3>No Posts</h3>
        )}
      </div>
      <div className="user_controls">
        <span>userId: {user?._id}</span>
        <button className="user_logout_btn" onClick={handleClick}>
          logout
        </button>
      </div>
    </div>
  );
}
