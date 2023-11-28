import "./post.scss";
import { useEffect, useState } from "react";

import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";

import Button from "./button";
import Comments from "./comments";
import { useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import { queryClient } from "../App";

export default function Post({ author, title, description, timestamp, post }) {
  const userId = sessionStorage.getItem("userId");

  const getLike = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/post/${post._id}/${userId}/like`
      );
      const data = res.json();
      return data;
    },
    queryKey: ["like"],
  });

  const getLikes = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/post/${post._id}/likes`
      );
      const data = await res.json();
      return data;
    },
    queryKey: ["post", post._id],
  });

  const updateLike = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/post/${userId}/${post._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      if (data && data.message === "SUCCESS") {
        setLiked(getLike.data);
        queryClient.invalidateQueries(["post", post._id]);
        toast.success(data.message);
      } else {
        setLiked(!liked);
        toast.error("Failed to update like status");
      }
    },
    onError: () => {
      toast.error("Failed to update like status");
    },
  });

  const { data: like } = getLike;
  const { data: likeCount } = getLikes;

  const [liked, setLiked] = useState(false);

  useEffect(() => setLiked(like), [setLiked, like]);

  const handleClick = async () => {
    try {
      await updateLike.mutateAsync();
      setLiked(!liked);
    } catch (error) {
      toast.error("Failed to update like status");
    }
  };

  const handleCommentClick = () => {
    setExpanded((prevVal) => !prevVal);
  };

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="post_wrapper">
      <div className="post_header">
        <div className="post_author">
          <span>{author}</span>
        </div>
        <div className="post_controls">
          <Button
            icon={<AiOutlineLike />}
            onClick={handleClick}
            className={liked ? "post_liked" : ""}
          />
          <Button
            icon={<FiMessageCircle />}
            onClick={handleCommentClick}
            className={expanded && "comments_opened"}
          />
        </div>
      </div>
      <div className="post_body">
        <h3>{title}</h3>
        <p>{description}</p>
        {expanded && (
          <div className="post_comments">
            <Comments post={post} />
          </div>
        )}
      </div>
      <div className="post_footer">
        <h4>Likes: {likeCount?.likeCount}</h4>
        {timestamp.split("T")[0]}
      </div>
    </div>
  );
}
