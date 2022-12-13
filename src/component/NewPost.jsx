import React,{useContext, useState} from 'react'
import PostProvider from '../context/PostContext'
import { format } from 'date-fns';
import api from '../api/posts';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const context = useContext(PostProvider);

  const navigate = useNavigate();

  const {setBlogPosts,blogpost
    } = context;

    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = blogpost.length ? blogpost[blogpost.length -1].id + 1 : 1;
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      const newPost = {id, title:postTitle, datetime, body:postBody};
      try {
        const response = await api.post("/posts", newPost)
        const newAddedPost = [...blogpost, response.data];
        setBlogPosts(newAddedPost);
        setPostTitle("");
        setPostBody("");
        navigate("/");
      } catch (err) {
        console.log('Error', err.message);
      }
    }
  return (
    <div className='NewPost'>
      <h1>New Post</h1>
      <form onSubmit={handleSubmit}  className='form'>
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          required
          value={postTitle}
          id="title"
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="body">Body</label>
        <textarea 
          type="text" 
          value={postBody}
          id="body"
          required
          rows="5"
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button>Add post</button>
      </form>
    </div>
  )
}

export default NewPost