import React, { useEffect,useContext, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import PostProvider from '../context/PostContext'
import { format } from 'date-fns';
import api from '../api/posts';

const EditPost = () => {
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const context = useContext(PostProvider);

  const navigate = useNavigate();

  const {setBlogPosts,blogpost
    } = context;

  const { id } = useParams();
  const post = blogpost.find(post => post.id === parseInt(id));

  useEffect(() => {
    if(post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  },[post,setEditTitle,setEditBody])

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const editPost = {id, title:editTitle, datetime, body:editBody};
    try {
      const response = await api.put(`/posts/${id}`,editPost);
      setBlogPosts(blogpost.map((blog) => 
        blog.id === id ? {...response.data} : blog
      ))
      setEditBody("")
      setEditTitle("")
      navigate("/")
    } catch (err) {
      console.log('Error', err.message);
    }
  }
  return (
    <div className='NewPost'>
      {
        editTitle && 
        <>
          <h1>New Post</h1>
          <form onSubmit={(e) => e.preventDefault()}  className='form'>
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              required
              value={editTitle}
              id="title"
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="body">Body</label>
            <textarea 
              type="text" 
              value={editBody}
              id="body"
              required
              rows="5"
              onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button type='button'
              onClick={() => handleEdit(post.id)}
            >Edit post</button>
          </form>
        </>
      }
       {
        !post && 
        <div>
          <h2>Opps Looks like no post Found</h2>
          <p>Well that's disapointing</p>
          <p><Link to='/'>
            Visit our Posts Page
          </Link></p>
        </div>
      }
    </div>
  )
}

export default EditPost