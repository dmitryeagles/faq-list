import axios from 'axios';
import { Faq } from '../interfaces/Faq';

interface FaqItemProps {
  faq: Faq;
  fetchFaqs: () => void;
  setModalIsOpen: (isOpen: boolean) => void;
  setCurrentFaqId: (id: number | null) => void;
}

const FaqItem = ({ faq, fetchFaqs, setModalIsOpen, setCurrentFaqId }: FaqItemProps) => {
  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:3000/faqs/${faq.id}`, { ...faq, likes: faq.likes + 1 });
      fetchFaqs();
    } catch (error) {
      console.error('Error liking FAQ:', error);
    }
  };

  const handleDislike = () => {
    setCurrentFaqId(faq.id);
    setModalIsOpen(true);
  };

  return (
    <li key={faq.id} className="faq-item">
      <h2 className="faq-question">{faq.question}</h2>
      <p className="faq-answer">{faq.answer}</p>
      <div className="faq-buttons">
        <button onClick={handleLike}>Like ({faq.likes})</button>
        <button onClick={handleDislike}>Dislike ({faq.dislikes})</button>
      </div>
      {faq.comments.length > 0 &&
      <div>
        <h3>Comments:</h3>
        <ul>
          {faq.comments.filter((com)=>com.length > 1).map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>}
    </li>
  );
};

export default FaqItem;