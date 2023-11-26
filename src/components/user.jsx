import Post from "./post";

import "./user.scss";

export default function User({ user, handleClick }) {
  console.log(user);

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
        {user && user.length !== 0 ? (
          user.posts.map((post) => (
            <Post
              key={post._id}
              author={post.author}
              title={post.title}
              description={post.description}
              timestamp={post.timestamp}
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
