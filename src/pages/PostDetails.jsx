import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Common from './Common';
import PostDetail from '../components/Posts/Post/PostDetail';

import PostService from '../services/post.service';

const PostDetails = () => {
    const [post, setPost] = useState();
    const [reload, setReload] = useState(false);
    let params = useParams();


    useEffect(() => {
        PostService.getPostById(params.id)
            .then((res) => {
                setPost(res.data.content);
            }, (err) => {
                console.log(err.response.data.message);
            });
    }, [params.id, reload]);

    const handleReload = () => {
        setReload(true);
    };

    return (
        <Common>
            {post ? (<PostDetail post={post} onReload={handleReload} />) : (<div>Not Found</div>)}
        </Common>
    );
};

export default PostDetails;