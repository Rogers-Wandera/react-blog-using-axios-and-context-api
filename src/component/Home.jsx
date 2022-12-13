import React,{useContext} from 'react'
import Feed from './Feed'
import PostProvider from '../context/PostContext'

const Home = () => {
  const context = useContext(PostProvider);

  const {posts,fetchError,isLoading} = context;
  return (
    <main className='Home'>

      {
        isLoading ? <p>Loading posts please wait</p> : null
      }
      {
        !isLoading && fetchError ? <p
          style={{color:'red'}}
        >An Error occured while loading the posts please reload your PAGE</p>
        : null
      }
      {
        !isLoading && !fetchError &&
        (posts.length > 0 ? <Feed posts={posts}/>:
          <p>No Posts to show</p>
        )}
    </main>
  )
}

export default Home