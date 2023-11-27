import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../App";

import { IoMdAdd } from "react-icons/io";
import Comment from "./comment";
import toast from "react-hot-toast";
import "./comments.scss";

export default function Comments({ post }) {
  const [comment, setComment] = useState("");

  const getComments = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/${post._id}/comments`
      );
      const data = await res.json();
      return data;
    },
    queryKey: ["post", "comment"],
  });

  const addComment = useMutation({
    mutationFn: async (newComment) => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/post/${post._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["post", "comment"]);
    },
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleSubmit = async () => {
    const newComment = {
      userId: post.userId,
      postId: post._id,
      author: post.author,
      comment: comment,
    };

    const data = await addComment.mutateAsync(newComment);

    if (data) {
      toast.success("Comment Added");
    } else {
      toast.error("SOMETHING_WENT_WRONG");
    }
  };

  const commentData = getComments.data;

  return (
    <div className="comments_wrapper">
      <div className="comments_holder">
        {!getComments.isLoading &&
          commentData.length !== 0 &&
          commentData?.map((comment) => (
            <Comment
              key={comment._id}
              id={comment._id}
              author={comment.author}
              comment={comment.comment}
              timestamp={comment.timestamp.split("T")[0]}
            />
          ))}
        {getComments.isLoading && <h4>Loading...</h4>}
        {!getComments.data && <h4>No Comments</h4>}
      </div>
      <div className="comments_add_wrapper">
        <div className="comments_add">
          <input type="text" name="comment" onChange={handleChange} />
          <button
            className="comment_add_btn"
            onClick={() => handleSubmit()}
            name="comment_add_btn"
          >
            <IoMdAdd />
          </button>
        </div>
      </div>
    </div>
  );
}
