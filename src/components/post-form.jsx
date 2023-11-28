import { useState } from "react";
import { useMutation } from "react-query";
import { useLoaderData } from "react-router-dom";

import "./post-form.scss";
import toast from "react-hot-toast";
import { queryClient } from "../App";

export default function PostForm() {
  const user = useLoaderData();

  const postMutation = useMutation({
    mutationFn: async (post) => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/post/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...post,
            userId: user._id,
            author: user.username,
          }),
        }
      );
      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts", "likes", "like"]);
    },
  });

  const [post, setPost] = useState({
    title: "",
    description: "",
    comments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPost((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await postMutation.mutateAsync(post);
    if (data) {
      toast.success("POST_SUCCESSFULLY_CREATED");
    } else {
      toast.error("SOMETHING_WENT_WRONG");
    }
    setPost(() => ({ title: "", description: "", comments: [] }));
  };

  return (
    <div className="post_form_wrapper">
      <form className="post_form" onSubmit={handleSubmit}>
        <div className="post_form_title">
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={post.title}
            required
          />
        </div>
        <div className="post_form_content">
          <label>Description</label>
          <textarea
            rows="8"
            name="description"
            onChange={handleChange}
            value={post.description}
          />
        </div>
        <button
          type="submit"
          style={{ background: postMutation.isLoading && "green" }}
        >
          {postMutation.isLoading ? "Creating" : "Create New Post"}
        </button>
      </form>
    </div>
  );
}
