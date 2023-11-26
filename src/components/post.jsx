import "./post.scss";
import { useState } from "react";

import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";

import Button from "./button";

export default function Post({ id, author, title, description, timestamp }) {
  const [like, setLike] = useState(false);

  return (
    <div className="post_wrapper">
      <div className="post_header">
        <div className="post_author">
          <span>{author}</span>
        </div>
        <div className="post_controls">
          <Button
            icon={<AiOutlineLike />}
            onClick={() => setLike((prevVal) => !prevVal)}
            className={like && "post_liked"}
          />
          <Button icon={<FiMessageCircle />} />
        </div>
      </div>
      <div className="post_footer">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="post_time">{timestamp.split("T")[0]}</div>
    </div>
  );
}
