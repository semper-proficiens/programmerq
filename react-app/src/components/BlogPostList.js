import React, {useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import { DarkModeContext } from '../contexts/DarkModeContext';
import '../styles/blogcategorypostslist.css';

const blogPosts = {
    'Hardware': ['ServerRack', 'Post 2', 'Post 3'],
    'Security': ['Post 4', 'Post 5', 'Post 6'],
    'App Performance': ['Post 7', 'Post 8', 'Post 9'],
    'CI/CD': ['Post 10', 'Post 11', 'Post 12'],
    'SEO': ['Post 13', 'Post 14', 'Post 15'],
};

function BlogPostList() {
    const { isDarkMode } = useContext(DarkModeContext);

    const { id } = useParams();
    const category = id.replace(/%20/g, " ");
    const posts = blogPosts[category];

    return (
        <div className={isDarkMode ? 'post-list dark-mode' : 'post-list'}>
            <h2 className="blog-header">{category} Posts</h2>
            <ul>
                {posts.map((post, index) => (
                    <li key={index} className="post-item">
                        <Link to={`/post/${post.replace(/\s/g, '-')}`} className="blog-post-link">
                            {post}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BlogPostList;