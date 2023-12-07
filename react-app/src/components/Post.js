// components/Post.js
import React, { useEffect, useState } from 'react';

const Post = ({ match }) => {
    const [post, setPost] = useState({});

    useEffect(() => {
        // Assuming you have a function to fetch the post based on the ID
        // Replace this with your actual data fetching logic
        const fetchPost = async () => {
            const postId = match.params.id;
            // Fetch post based on postId and set it in state
            // Replace the following line with your actual data fetching logic
            const fetchedPost = await fetch(`/api/posts/${postId}`).then((res) => res.json());
            setPost(fetchedPost);
        };

        fetchPost();
    }, [match.params.id]);

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default Post;
