import React from 'react';
import { Route, Routes, useLocation  } from 'react-router-dom';

import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Category from './Category';
import Posts from '../components/Posts/Posts';
import Dashboard from '../components/Dashboard/Dashboard';
import Users from '../components/Dashboard/components/Users';
import UserForm from '../components/Dashboard/components/UserForm';
import PostDetails from './PostDetails';
import Profile from './Profile';
import AllPost from './AllPost'


const Pages = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/signin/' element={<SignIn />} />
        <Route path='/signup/' element={<SignUp />} />
        <Route path='/categories/:id' element={<Category />} />
        <Route path='/dashboard/' element={<Dashboard />}>
          <Route path='users' element={<Users />} />
          <Route path='posts' element={<Posts />} />
          <Route path='create-user' element={<UserForm />} />
        </Route>
        <Route path='/posts/:id' element={<PostDetails />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/posts' element={<AllPost />} />
    </Routes>
  );
}

export default Pages;