import "./post.scss";
import { useState } from "react";

import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";

import Button from "./button";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

export default function Post({ author, title, timestamp }) {
  const [like, setLike] = useState(false);
  const [updatePost, setUpdatePost] = useState();

  const getPost = useQuery({
    queryFn: () => {
      data = axios.get(`${process.env.BACKEND_URL}/post/:postId`);
      setUpdatePost(data);
    },
  });

  const updateLike = useMutation({
    mutationFn: () => {
      return axios.patch(`${process.env.BACKEND_URL}/post/:postId`);
    },
  });

  return (
    <div className="post_wrapper">
      <div className="post_header">
        <div className="post_author">
          <img
            src="https://images.unsplash.com/photo-1681008570032-abdfcb23f875?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="userImg"
          />
          <span>{author ? author : "slim-shady"}</span>
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
        <div className="post_content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="post_time">{timestamp ? timestamp : "2022-10-11"}</div>
    </div>
  );
}
