import React from 'react';

export type UsernameModalProps = {
  isOpen: boolean;
  username: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const UsernameModal: React.FC<UsernameModalProps> = ({ isOpen, username, onChange, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-[20px] p-10 w-[538px] flex flex-col gap-6 shadow-lg">
        <div className="text-[36px] font-normal text-black leading-[26px] text-center">Enter your username</div>
        <div className="relative">
          <input
            className="w-full px-10 py-4 rounded-lg bg-[#D9D9D9] text-[24px] text-[#878787] placeholder-[#878787] focus:outline-none"
            type="text"
            value={username}
            onChange={e => onChange(e.target.value)}
            placeholder="UserName"
            aria-label="Username"
            onKeyDown={e => e.key === 'Enter' && username.trim() && onSubmit()}
          />
        </div>
        <button
          className="bg-[#00B7FF] text-white text-[20px] font-normal rounded-lg py-2 px-20 mx-auto hover:opacity-90 focus:outline-none disabled:opacity-50"
          onClick={onSubmit}
          disabled={!username.trim()}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default UsernameModal;
