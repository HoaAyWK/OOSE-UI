import React, { useEffect, useState } from 'react';

import PostCarousel from '../components/Posts/PostCarousel';
import ExpensivePosts from '../components/Posts/ExpensivePosts';
import CategoryCarousel from '../components/Categories/CategoryCarousel';
import BannerCreatePost from '../components/Posts/Post/BannerCreatePost';
import CategoryService from '../services/category.service';
import PostService from '../services/post.service';
import Common from './Common';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar } from '../slices/avatar';

const Home = () => {
  const [cates, setCates] = useState();
  const [posts, setPosts] = useState();
  const [highestPricePosts, setHighestPricePosts] = useState();
  const { isSignedIn, user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignedIn) {
      console.log(currentUser);
      dispatch(setAvatar(currentUser.userAvatar)); 
    }
    CategoryService.getCategories()
      .then((res) => {
        setCates(res.data.content);
      }, (error) => {
        console.log(error.response.data.message);
      });
    
    PostService.getActivePosts()
      .then((res) => {
        setPosts(res.data.content);
      }, (err) => {
        console.log(err.response.data.message);
      });

    PostService.getHighestPosts(4)
      .then((res) => {
        setHighestPricePosts(res.data.content);
      }, (err) => {
        console.log(err.response.data.message);
      });
  }, [isSignedIn]);

  return (
    <Common>
      <BannerCreatePost />
      {posts && (<PostCarousel items={posts} />)}
      {cates && (<CategoryCarousel items={cates} />)}
      {highestPricePosts && (<ExpensivePosts items={highestPricePosts} />)}     
    </Common>
  );
}

export default Home;