import React from 'react';

export type PostModalProps = {
  isOpen: boolean;
  username: string;
  content: string;
  onChangeContent: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

const PostModal: React.FC<PostModalProps> = ({ isOpen, username, content, onChangeContent, onSubmit, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-[20px] p-10 w-[851px] flex flex-col gap-6 shadow-lg">
        <div className="text-[24px] font-normal text-[#606060] leading-[26px] mb-2">How do you feel today?</div>
        <textarea
          className="w-full px-6 py-6 rounded-lg bg-[#D9D9D9] text-[24px] text-gray-700 placeholder-gray-500 focus:outline-none resize-none"
          value={content}
          onChange={e => onChangeContent(e.target.value)}
          placeholder="What's on your mind?"
          aria-label="Post content"
          rows={6}
        />
        <div className="flex gap-6 justify-center mt-4">
          <button
            className="bg-[#00B7FF] text-white text-[20px] font-normal rounded-lg py-2 px-20 hover:opacity-90 focus:outline-none disabled:opacity-50"
            onClick={onSubmit}
            disabled={!content.trim()}
          >
            Submit
          </button>
          <button
            className="bg-[#CCF1FF] text-black text-[20px] font-normal rounded-lg py-2 px-20 hover:opacity-90 focus:outline-none"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
