import React,{useContext} from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';
import PostProvider from '../context/PostContext'
import api from '../api/posts';

const PostPage = () => {
  const context = useContext(PostProvider);

  const {blogpost,setBlogPosts} = context;

  const {id} = useParams();
  const post = blogpost.find((post) =>post.id === parseInt(id))

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const filterPosts = blogpost.filter((post) => post.id !== id);
    await api.delete(`/posts/${id}`);
    setBlogPosts(filterPosts);
    navigate("/");
  }

  return (
    <div className='PostPage'>
      {
        post && 
        <div>
          <h2>{post.title}</h2>
          <p>{post.datetime}</p>
          <p>{post.body}</p>
          <button className='delete-btn' onClick={() => handleDelete(post.id)}>
            Delete
          </button>
          <Link to={`/edit/${post.id}`}>
          <button className='delete-btn'>
            Edit
          </button>
          </Link>
        </div>
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

export default PostPage