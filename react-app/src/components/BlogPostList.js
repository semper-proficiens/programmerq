import React from 'react';
import { useParams, Link } from 'react-router-dom';

const blogPosts = {
    'Hardware': ['ServerRack', 'Post 2', 'Post 3'],
    'Security': ['Post 4', 'Post 5', 'Post 6'],
    'App Performance': ['Post 7', 'Post 8', 'Post 9'],
    'CI/CD': ['Post 10', 'Post 11', 'Post 12'],
    'SEO': ['Post 13', 'Post 14', 'Post 15'],
};

function BlogPostList() {
    const { id } = useParams();
    const category = id.replace(/%20/g, " ");
    const posts = blogPosts[category];

    return (
        <div className="blog-post-list">
            <h2>{category} Posts</h2>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>
                        <Link to={`/post/${post.replace(/\s/g, '-')}`}>{post}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BlogPostList;