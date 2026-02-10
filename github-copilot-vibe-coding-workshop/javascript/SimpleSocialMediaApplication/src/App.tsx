import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import Search from './pages/Search';
import UsernameModal from './components/UsernameModal';
import PostModal from './components/PostModal';
import ApiUnavailableBanner from './components/ApiUnavailableBanner';
import homeIcon from './assets/icons/home.svg';
import searchIcon from './assets/icons/search.svg';
import personIcon from './assets/icons/person.svg';
import closeIcon from './assets/icons/close.svg';
import plusIcon from './assets/icons/plus.svg';
import {
  fetchPosts,
  fetchPost,
  createPost,
  fetchComments,
  createComment,
  likePost,
} from './api';
import { Post } from './components/PostList';
import { Comment } from './components/CommentList';

const App: React.FC = () => {
  const [username, setUsername] = useState('Guest');
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [showApiUnavailable, setShowApiUnavailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState<'home' | 'details' | 'search'>('home');

  // Fetch posts
  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(() => setShowApiUnavailable(true));
  }, []);

  // Fetch comments when post selected
  useEffect(() => {
    if (selectedPostId) {
      fetchComments(selectedPostId)
        .then(setComments)
        .catch(() => setShowApiUnavailable(true));
    }
  }, [selectedPostId]);

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      setShowUsernameModal(false);
    }
  };

  const handleSelectPost = (postId: string) => {
    setSelectedPostId(postId);
    setPage('details');
  };

  const handleCreatePost = () => {
    setPostContent('');
    setShowPostModal(true);
  };

  const handleSubmitPost = async () => {
    try {
      const post = await createPost({ username, content: postContent });
      setPosts([post, ...posts]);
      setShowPostModal(false);
    } catch {
      setShowApiUnavailable(true);
    }
  };

  const handleAddComment = async (content: string) => {
    if (!selectedPostId) return;
    try {
      const comment = await createComment(selectedPostId, { username, content });
      setComments([...comments, comment]);
    } catch {
      setShowApiUnavailable(true);
    }
  };

  const handleLike = async () => {
    if (!selectedPostId) return;
    try {
      await likePost(selectedPostId, { username });
      const post = await fetchPost(selectedPostId);
      setPosts(posts.map(p => (p.id === post.id ? post : p)));
    } catch {
      setShowApiUnavailable(true);
    }
  };

  const filteredPosts = searchQuery
    ? posts.filter(p =>
        p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : posts;

  return (
    <div className="w-[1280px] h-[832px] bg-white relative mx-auto my-0">
      <ApiUnavailableBanner show={showApiUnavailable} />
      <UsernameModal
        isOpen={showUsernameModal}
        username={username}
        onChange={setUsername}
        onSubmit={handleUsernameSubmit}
      />
      <PostModal
        isOpen={showPostModal}
        username={username}
        content={postContent}
        onChangeContent={setPostContent}
        onSubmit={handleSubmitPost}
        onCancel={() => setShowPostModal(false)}
      />
      
      {/* Left Navigation Sidebar - Frame 1 */}
      <div 
        className="absolute bg-[#E5A000] rounded-r-[20px] flex flex-col items-center justify-center"
        style={{ 
          left: '130px', 
          top: '0', 
          width: '110px', 
          height: '832px',
          gap: '147px',
          padding: '10px'
        }}
      >
        <button
          className="hover:opacity-80 focus:outline-none"
          aria-label="Home"
          tabIndex={0}
          onClick={() => setPage('home')}
          style={{ width: '58px', height: '51px' }}
        >
          <img src={homeIcon} alt="Home" className="w-full h-full" />
        </button>
        <button
          className="hover:opacity-80 focus:outline-none"
          aria-label="Search"
          tabIndex={0}
          onClick={() => setPage('search')}
          style={{ width: '58px', height: '58px' }}
        >
          <img src={searchIcon} alt="Search" className="w-full h-full" />
        </button>
        <button
          className="hover:opacity-80 focus:outline-none"
          aria-label="Profile"
          tabIndex={0}
          onClick={() => setShowUsernameModal(true)}
          style={{ width: '58px', height: '58px' }}
        >
          <img src={personIcon} alt="Profile" className="w-full h-full" />
        </button>
        <button
          className="hover:opacity-80 focus:outline-none"
          aria-label="Close"
          tabIndex={0}
          onClick={() => window.close?.()}
          style={{ width: '58px', height: '58px' }}
        >
          <img src={closeIcon} alt="Close" className="w-full h-full" />
        </button>
      </div>
      
      {/* Center Content - Frame 2 */}
      <div 
        className="absolute"
        style={{ 
          left: '260px', 
          top: '0'
        }}
      >
        {page === 'home' && (
          <Home
            posts={filteredPosts}
            onSelectPost={handleSelectPost}
            onCreatePost={handleCreatePost}
          />
        )}
        {page === 'details' && selectedPostId && (
          <PostDetails
            post={posts.find(p => p.id === selectedPostId)!}
            comments={comments}
            onLike={handleLike}
            onAddComment={handleAddComment}
            onBack={() => setPage('home')}
          />
        )}
        {page === 'search' && (
          <Search
            posts={filteredPosts}
            onSelectPost={handleSelectPost}
            onSearch={setSearchQuery}
            query={searchQuery}
          />
        )}
      </div>
      
      {/* Right Sidebar with + button - Frame 3 */}
      <div 
        className="absolute bg-[#E5A000] rounded-l-[20px] flex flex-col items-center justify-center"
        style={{ 
          left: '1040px', 
          top: '0', 
          width: '110px', 
          height: '832px',
          gap: '147px',
          padding: '10px'
        }}
      >
        <button
          className="hover:opacity-80 focus:outline-none"
          onClick={handleCreatePost}
          aria-label="Create new post"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleCreatePost()}
          style={{ width: '58px', height: '58px' }}
        >
          <img src={plusIcon} alt="Add post" className="w-full h-full" />
        </button>
      </div>
    </div>
  );
};

export default App;
