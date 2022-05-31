import React, { useEffect, useState } from 'react';

import Posts from '../components/Posts/Posts';
import Common from './Common';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar } from '../slices/avatar';
import CreatePostDialog from '../components/Profile/CreatePostDialog';
import { startGetAllPost } from '../slices/posts/postCreator';

const AllPost = () => {

  const { isSignedIn, user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.jobs);
  
  const [openCreatePost, setOpenCreatePost] = useState(false);

  const handleCloseCreatPost = () => {
      setOpenCreatePost(false);
  };

  useEffect(() => {
    if (isSignedIn) {
      console.log(currentUser);
      dispatch(setAvatar(currentUser.userAvatar)); 
    }
    
    dispatch(startGetAllPost());
  }, [currentUser, dispatch, isSignedIn]);
    return (
        <Common>
          {posts && (<Posts posts={posts} />)}
          <CreatePostDialog 
            open={openCreatePost} 
            onClose={handleCloseCreatPost}
          />
        </Common>
      ); 
}

export default AllPost