import React from 'react';
import heartIcon from '../assets/icons/heart.svg';
import commentIcon from '../assets/icons/comment.svg';

export type Post = {
  id: string;
  username: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
};

export type PostListProps = {
  posts: Post[];
  onSelect: (postId: string) => void;
};

const PostList: React.FC<PostListProps> = ({ posts, onSelect }) => (
  <div className="flex flex-col w-[760px]">
    {posts.map((post, index) => (
      <div key={post.id}>
        <div
          className="relative bg-[#E5A000] cursor-pointer hover:opacity-90 transition-opacity"
          style={{ width: '760px', height: '263px' }}
          tabIndex={0}
          aria-label={`View post by ${post.username}`}
          onClick={() => onSelect(post.id)}
          onKeyDown={e => e.key === 'Enter' && onSelect(post.id)}
        >
          {/* Avatar */}
          <div 
            className="absolute rounded-full bg-[#D9D9D9]"
            style={{ 
              left: '27px', 
              top: '25px', 
              width: '100px', 
              height: '100px' 
            }}
          ></div>
          
          {/* Username */}
          <div 
            className="absolute text-[32px] font-normal text-white text-center"
            style={{ 
              left: '152px', 
              top: '61px',
              width: '160px',
              height: '27px',
              lineHeight: '27px'
            }}
          >
            {post.username}
          </div>
          
          {/* Post Content Frame */}
          <div 
            className="absolute flex items-center"
            style={{ 
              left: '27px', 
              top: '122px',
              width: '700px',
              height: '89px',
              padding: '20px 0'
            }}
          >
            <div className="text-[32px] font-normal text-white leading-[27px]">
              {post.content}
            </div>
          </div>
          
          {/* Heart Icon */}
          <div 
            className="absolute"
            style={{ 
              left: '27px', 
              top: '207.09px'
            }}
          >
            <img src={heartIcon} alt="Like" style={{ width: '58px', height: '43.06px' }} />
          </div>
          
          {/* Comment Icon */}
          <div 
            className="absolute"
            style={{ 
              left: '111px', 
              top: '207.09px'
            }}
          >
            <img src={commentIcon} alt="Comment" style={{ width: '55px', height: '47.9px' }} />
          </div>
        </div>
        
        {/* White separator line */}
        {index < posts.length - 1 && (
          <div style={{ width: '760px', height: '2px', backgroundColor: '#FFFFFF' }}></div>
        )}
      </div>
    ))}
  </div>
);

export default PostList;
