import axios from "axios";

import { useState, useEffect } from "react";
import { useMutation } from "react-query";

import "./post-form.scss";

export default function PostForm() {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const addPost = (post) => {
    axios.post("/new/post", {
      headers: {
        "Content-Type": "application/json",
      },
      body: post,
    });
  };

  const mutation = useMutation({
    mutationFn: (newPost) => addPost(newPost),
  });

  const handleSubmit = (e) => {
    const { name, value } = e.target;

    setPost((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));

    mutation.mutate(post);

    e.preventDefault();
  };

  return (
    <div className="post_form_wrapper">
      <form className="post_form" onSubmit={handleSubmit}>
        <div className="post_form_title">
          <label>Title</label>
          <input type="text" name="title" required />
        </div>
        <div className="post_form_content">
          <label>Description</label>
          <textarea rows="8" name="description" />
        </div>
        {!mutation.isLoading && (
          <button disabled={post.title && post.description && post.img && true}>
            Create New Post
          </button>
        )}
      </form>
    </div>
  );
}
