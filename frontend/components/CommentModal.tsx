import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';

interface CommentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  currentFaqId: number | null;
  fetchFaqs: () => void;
}

const CommentModal = ({ isOpen, onRequestClose, currentFaqId, fetchFaqs }: CommentModalProps) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async () => {
    if (currentFaqId !== null) {
      try {
        const faq = await axios.get(`http://localhost:3000/faqs/${currentFaqId}`);
        await axios.put(`http://localhost:3000/faqs/${currentFaqId}`, { ...faq.data, dislikes: faq.data.dislikes + 1, comments: [...faq.data.comments, comment] });
        fetchFaqs();
        onRequestClose();
        setComment('');
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Comment Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
      style={{
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          width: '300px',
          border: '1px solid rgba(0, 0, 0, 0.75)',
        }
      }}
    >
      <h2 className="modal-header">Enter your comment:</h2>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        cols={30}
        className="modal-input"
      />
      <div className='btn-container'>
        <button onClick={handleCommentSubmit}>Submit</button>
        <button onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default CommentModal;