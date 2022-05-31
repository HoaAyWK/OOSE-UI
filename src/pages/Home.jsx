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
import CreatePostDialog from '../components/Profile/CreatePostDialog';
import { startGetAllPost } from '../slices/posts/postCreator';

const Home = () => {
  const [cates, setCates] = useState();
  const [highestPricePosts, setHighestPricePosts] = useState();
  const { isSignedIn, user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.jobs);
  
  const [openCreatePost, setOpenCreatePost] = useState(false);

  const handleClickOpenCreatPost = () => {
    setOpenCreatePost(true);
  };

  const handleCloseCreatPost = () => {
      setOpenCreatePost(false);
  };

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
    
    dispatch(startGetAllPost());

    PostService.getHighestPosts(4)
      .then((res) => {
        setHighestPricePosts(res.data.content);
      }, (err) => {
        console.log(err.response.data.message);
      });
  }, [currentUser, dispatch, isSignedIn]);

  return (
    <Common>
      <BannerCreatePost isClick={handleClickOpenCreatPost} />
      {posts && (<PostCarousel items={posts} />)}
      {cates && (<CategoryCarousel items={cates} />)}
      {highestPricePosts && (<ExpensivePosts items={highestPricePosts} />)}     
      <CreatePostDialog 
        open={openCreatePost} 
        onClose={handleCloseCreatPost}
      />
    </Common>
  );
}

export default Home;