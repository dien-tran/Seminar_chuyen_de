import React from 'react';
import { Post } from './PostList';
import CommentList, { Comment } from './CommentList';
import heartIcon from '../assets/icons/heart.svg';
import commentIcon from '../assets/icons/comment.svg';
import plusIcon from '../assets/icons/plus.svg';

export type PostDetailProps = {
  post: Post;
  comments: Comment[];
  onLike: () => void;
  onAddComment: (content: string) => void;
  onBack: () => void;
};

const PostDetail: React.FC<PostDetailProps> = ({ post, comments, onLike, onAddComment, onBack }) => {
  const [comment, setComment] = React.useState('');
  return (
    <div className="w-[760px] bg-[#E5A000] min-h-screen rounded-[20px]">
      {/* Post Detail */}
      <div className="p-6 border-b-2 border-white" style={{ minHeight: '334px' }}>
        <div className="flex items-start gap-6">
          <div className="w-[100px] h-[100px] rounded-full bg-[#D9D9D9] flex-shrink-0"></div>
          <div className="flex-1">
            <div className="text-[32px] font-normal text-white leading-[26px] mb-4">{post.username}</div>
            <div className="text-[32px] font-normal text-white leading-[26px] py-5">{post.content}</div>
            <div className="flex gap-6 items-center mt-6">
              <button onClick={onLike} className="focus:outline-none hover:opacity-80">
                <img src={heartIcon} alt="Like" className="w-[58px] h-[43px]" />
              </button>
              <img src={commentIcon} alt="Comment" className="w-[55px] h-[48px]" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments List */}
      <div>
        {comments.map((c, index) => (
          <div key={c.id}>
            <div className="p-6" style={{ minHeight: '129px' }}>
              <div className="flex items-start gap-4">
                <div className="w-[60px] h-[60px] rounded-full bg-[#D9D9D9] flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="text-[24px] font-normal text-white leading-[20px] mb-2">{c.username}</div>
                  <div className="text-[24px] font-normal text-white leading-[20px]">{c.content}</div>
                </div>
              </div>
            </div>
            {index < comments.length - 1 && <div className="h-[2px] bg-white"></div>}
          </div>
        ))}
      </div>

      {/* Add Comment Section */}
      <div className="fixed bottom-6 left-[130px] right-[130px] flex items-center justify-center gap-4 px-6">
        <input
          className="flex-1 max-w-[642px] px-4 py-3 rounded-lg text-[20px] text-gray-700 placeholder-gray-400 focus:outline-none"
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment..."
          aria-label="Add comment"
        />
        <button
          className="w-[61px] h-[56px] bg-[#00B7FF] rounded-lg flex items-center justify-center hover:opacity-90 focus:outline-none"
          onClick={() => { if (comment.trim()) { onAddComment(comment); setComment(''); } }}
          disabled={!comment.trim()}
        >
          <img src={plusIcon} alt="Add comment" className="w-[41px] h-[41px]" />
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
