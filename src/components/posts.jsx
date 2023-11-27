import Post from "./post";
import "./posts.scss";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts &&
        posts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            author={post.author}
            title={post.title}
            description={post.description}
            timestamp={post.timestamp}
            comments={post.comments}
            post={post}
          />
        ))}
      {!posts && posts.length === 0 && <h2>NO_POSTS</h2>}
    </div>
  );
}
