import React, {createContext,useState,useEffect} from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const PostProvider = createContext();

export const PostContext = ({children}) => {

const [search,setSearch] = useState("");
  const [blogpost,setBlogPosts] = useState([]);
  const [searhresults,setSearchResults]= useState([]);

  const { data,isLoading,fetchError } = useAxiosFetch("http://localhost:3500/posts");

  useEffect(() => {
    setBlogPosts(data)
  },[data])

  useEffect(() => {
    const filterResults = blogpost.filter(post => 
      (post.body).toLowerCase().includes(search.toLowerCase()) || 
      (post.title).toLowerCase().includes(search.toLowerCase()))

      setSearchResults(filterResults.reverse())
  },[blogpost,search])


  return (
      <PostProvider.Provider value={{
          search,
          setSearch,
          posts : searhresults,
          isLoading : isLoading,
          fetchError : fetchError,
          blogpost,
          setBlogPosts
      }}>
          {children}
      </PostProvider.Provider>
  )
}

export default PostProvider;