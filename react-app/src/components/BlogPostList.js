import React, {useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import { DarkModeContext } from '../contexts/DarkModeContext';
import '../styles/blogcategorypostslist.css';
import BlogPosts from "./BlogPosts";

function BlogPostList() {
    const { isDarkMode } = useContext(DarkModeContext);
    const { id } = useParams();
    const category = id.replace(/%20/g, " ");
    const posts = BlogPosts[category] || []; // Default to an empty array if the category doesn't exist

    return (
        <div className={isDarkMode ? 'post-list dark-mode' : 'post-list'}>
            <h2 className="blog-header">{category} Posts</h2>
            <ul>
                {posts.map((post, index) => (
                    <li key={index} className="post-item">
                        <Link to={`/post/${post.slug}`} className="blog-post-link">
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BlogPostList;