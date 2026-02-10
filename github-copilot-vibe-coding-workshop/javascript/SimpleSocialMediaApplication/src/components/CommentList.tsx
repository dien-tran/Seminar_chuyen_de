import React from 'react';

export type Comment = {
  id: string;
  postId: string;
  username: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CommentListProps = {
  comments: Comment[];
};

const CommentList: React.FC<CommentListProps> = ({ comments }) => (
  <div className="flex flex-col gap-4 mt-4">
    {comments.map(comment => (
      <div key={comment.id} className="bg-gray-100 rounded-lg p-4">
        <div className="text-base font-medium text-gray-800">{comment.username}</div>
        <div className="text-sm text-gray-700 mt-1">{comment.content}</div>
        <div className="text-xs text-gray-500 mt-2">{new Date(comment.createdAt).toLocaleString()}</div>
      </div>
    ))}
  </div>
);

export default CommentList;
