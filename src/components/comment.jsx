import "./comment.scss";

export default function Comment({ author, comment, timestamp }) {
  return (
    <div className="comment_wrapper">
      <div className="comment_header">
        <h4>{author}</h4>
        <span>{timestamp}</span>
      </div>
      <div className="comment_body">
        <p>{comment}</p>
      </div>
    </div>
  );
}
