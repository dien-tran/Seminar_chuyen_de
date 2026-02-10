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
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40" style={{
      pointerEvents: 'none'
    }}>
      {/* Modal Container - WHITE background with BLACK border */}
      <div style={{
        pointerEvents: 'auto',
        position: 'fixed',
        left: '350px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '32px',
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '4px solid #000000'
      }}>
        {/* Title Section */}
        <div style={{
          fontSize: '20px',
          fontWeight: 'normal',
          color: '#4B5563'
        }}>
          How do you feel today?
        </div>

        {/* Textarea Container - GRAY background with visible spacing */}
        <div style={{
          borderRadius: '15px',
          border: '3px solid #9CA3AF',
          backgroundColor: '#D3D3D3',
          padding: '20px'
        }}>
          <textarea
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: '#E5E5E5',
              fontSize: '18px',
              color: '#4B5563',
              border: '2px solid #6B7280',
              resize: 'none',
              outline: 'none'
            }}
            value={content}
            onChange={e => onChangeContent(e.target.value)}
            placeholder="What's on your mind?"
            aria-label="Post content"
            rows={4}
          />
        </div>

        {/* Buttons Section */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center'
        }}>
          <button
            style={{
              backgroundColor: '#00B7FF',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              padding: '10px 40px',
              border: 'none',
              cursor: content.trim() ? 'pointer' : 'not-allowed',
              opacity: content.trim() ? 1 : 0.5
            }}
            onClick={onSubmit}
            disabled={!content.trim()}
          >
            Submit
          </button>
          <button
            style={{
              backgroundColor: '#B8E5FF',
              color: '#374151',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              padding: '10px 40px',
              border: 'none',
              cursor: 'pointer'
            }}
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
