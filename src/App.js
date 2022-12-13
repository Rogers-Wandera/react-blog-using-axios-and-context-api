import React from 'react';
import { Route,Routes } from 'react-router-dom';

// components
import Header from './component/Header';
import Nav from './component/Nav';
import Footer from './component/Footer';
import Home from './component/Home';
import NewPost from './component/NewPost';
import PostPage from './component/PostPage';
import About from './component/About';
import Missing from './component/Missing';
import EditPost from './component/EditPost';

//context
import {PostContext} from './context/PostContext';


function App() {
  return (
    <div className='app'>
      <PostContext>
        <Header title="Our Blog" />
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post' element={<NewPost />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/about' element={<About /> } />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      </PostContext>
    </div>
  )
}

export default App
