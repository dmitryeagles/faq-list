import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';

interface AddFaqModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  fetchFaqs: () => void;
}

const AddFaqModal = ({ isOpen, onRequestClose, fetchFaqs }: AddFaqModalProps) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const handleAddFaq = async () => {
    try {
      await axios.post('http://localhost:3000/faqs', { question: newQuestion, answer: newAnswer, likes: 0, dislikes: 0, comments: [] });
      fetchFaqs();
      onRequestClose();
      setNewQuestion('');
      setNewAnswer('');
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add FAQ Modal"
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
      <h2 className="modal-header">Add New FAQ</h2>
      <div>
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="modal-input"
        />
      </div>
      <div>
        <label htmlFor="answer">Answer:</label>
        <textarea
          id="answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          rows={4}
          cols={30}
          className="modal-input"
        />
      </div>
      <div className='btn-container'>
        <button onClick={handleAddFaq}>Add</button>
        <button onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default AddFaqModal;