import React from 'react';
import PostList, { Post } from '../components/PostList';
import searchIcon from '../assets/icons/search.svg';

export type SearchProps = {
  posts: Post[];
  onSelectPost: (postId: string) => void;
  onSearch: (query: string) => void;
  query: string;
};

const Search: React.FC<SearchProps> = ({ posts, onSelectPost, onSearch, query }) => (
  <div className="relative bg-[#E5A000] rounded-[20px]" style={{ width: '760px', height: '832px' }}>
    {/* Search Input Group - Group 16 */}
    <div 
      className="absolute"
      style={{ 
        left: '25px', 
        top: '59px',
        width: '614px',
        height: '67px'
      }}
    >
      <input
        className="w-full h-[56px] px-4 rounded-[10px] bg-[#D9D9D9] text-[24px] text-[#878787] placeholder-[#878787] focus:outline-none"
        type="text"
        value={query}
        onChange={e => onSearch(e.target.value)}
        placeholder="Enter keywords to search..."
        aria-label="Search posts"
        style={{ lineHeight: '26px' }}
      />
    </div>
    
    {/* Search Button - Group 17 */}
    <div 
      className="absolute bg-[#00B7FF] rounded-[10px] flex items-center justify-center cursor-pointer hover:opacity-90"
      style={{ 
        left: '923px', 
        top: '59px',
        width: '61px',
        height: '56px'
      }}
    >
      <img 
        src={searchIcon} 
        alt="Search" 
        style={{ width: '35px', height: '35px' }}
      />
    </div>
    
    {/* White separator line - Line 1 */}
    <div 
      className="absolute bg-white"
      style={{ 
        left: '1px', 
        top: '156px',
        width: '760px',
        height: '3px'
      }}
    ></div>
    
    {/* Posts List */}
    <div 
      className="absolute"
      style={{ 
        left: '0px', 
        top: '156px'
      }}
    >
      {posts.length === 0 ? (
        <div className="flex items-center justify-center text-white text-2xl px-6" style={{ width: '760px', height: '400px' }}>
          {query ? 'No posts found' : 'Enter a search term'}
        </div>
      ) : (
        <PostList posts={posts} onSelect={onSelectPost} />
      )}
    </div>
  </div>
);

export default Search;
