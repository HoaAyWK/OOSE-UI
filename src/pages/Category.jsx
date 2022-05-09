import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import Common from './Common';
import Posts from '../components/Posts/Posts';
import CategoryBanner from '../components/Categories/CategoryBanner';
import CategoryCarousel from '../components/Categories/CategoryCarousel';

import CategoryService from '../services/category.service';
import PostService from '../services/post.service';

const Category = () => {
    const [categories, setCategories] = useState();
    const [category, setCategory] = useState();
    const [posts, setPosts] = useState();
    let params= useParams();

    useEffect(() => {
        CategoryService.getCategories()
            .then((res) => {
                const currentCategory = res.data.content.filter((cate) => (
                    cate.id === params.id
                ));

                const rests = res.data.content.filter((cate) => (
                    cate.id !== params.id
                ));

                setCategories(rests);
                setCategory(currentCategory[0]);
            }, (error) => {
                console.log(error.response.data.message);
            });
        
        PostService.getPostsByCategory(params.id)
            .then((res) => {
                setPosts(res.data.content);
            }, (err) => {
                console.log(err.response.data.message);
            }
        );
    }, [params.id]);



    return (
        <Common>
            {category && (
                <CategoryBanner category={category} />
            )}
            {posts && (
                <Grid container maxWidth='xl'>
                    <Grid item xs={12}>
                        <Typography variant='h5' my={2}>
                            Posts
                        </Typography>
                    </Grid>
                    <Posts posts={posts} />
                </Grid>
            )}       
            {categories && (
                <CategoryCarousel items={categories} />
            )}
            
        </Common>
    );
};

export default Category;