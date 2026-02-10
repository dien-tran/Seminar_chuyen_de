import React from 'react';
import { Post } from '../components/PostList';
import { Comment } from '../components/CommentList';
import PostDetail from '../components/PostDetail';

export type PostDetailsProps = {
  post: Post;
  comments: Comment[];
  onLike: () => void;
  onAddComment: (content: string) => void;
  onBack: () => void;
};

const PostDetails: React.FC<PostDetailsProps> = ({ post, comments, onLike, onAddComment, onBack }) => (
  <PostDetail
    post={post}
    comments={comments}
    onLike={onLike}
    onAddComment={onAddComment}
    onBack={onBack}
  />
);

export default PostDetails;
