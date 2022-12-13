import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import PostProvider from '../context/PostContext'

const Nav = () => {
  const context = useContext(PostProvider);

  const {search,setSearch} = context;
  return (
    <nav className='nav'>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search blog</label>
        <input 
          type="text" 
          id='search'
          placeholder='Search...'
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Posts</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav