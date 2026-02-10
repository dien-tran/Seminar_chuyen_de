import React from 'react';
import PostList, { Post } from '../components/PostList';

export type HomeProps = {
  posts: Post[];
  onSelectPost: (postId: string) => void;
  onCreatePost: () => void;
};

const Home: React.FC<HomeProps> = ({ posts, onSelectPost, onCreatePost }) => (
  <div className="bg-[#E5A000] rounded-[20px]" style={{ width: '760px', minHeight: '832px' }}>
    {posts.length === 0 ? (
      <div className="flex items-center justify-center text-white text-2xl" style={{ height: '832px' }}>
        No posts yet. Click + to create one!
      </div>
    ) : (
      <PostList posts={posts} onSelect={onSelectPost} />
    )}
  </div>
);

export default Home;
