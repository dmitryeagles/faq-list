import axios from 'axios';
import { useEffect, useState } from 'react';
import AddFaqModal from '../components/AddFaqModal';
import CommentModal from '../components/CommentModal';
import FaqItem from '../components/FaqItem';
import { Faq } from '../interfaces/Faq';
import '../src/app/globals.css';

const Home = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentFaqId, setCurrentFaqId] = useState<number | null>(null);
  const [addFaqModalIsOpen, setAddFaqModalIsOpen] = useState(false);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/faqs');
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className="container">
      <h1>FAQs</h1>
      <ul className="faq-list">
        {faqs.map((faq) => (
          <FaqItem
            key={faq.id}
            faq={faq}
            fetchFaqs={fetchFaqs}
            setModalIsOpen={setModalIsOpen}
            setCurrentFaqId={setCurrentFaqId}
          />
        ))}
      </ul>
      <button onClick={() => setAddFaqModalIsOpen(true)}>Add FAQ</button>
      <CommentModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        currentFaqId={currentFaqId}
        fetchFaqs={fetchFaqs}
      />
      <AddFaqModal
        isOpen={addFaqModalIsOpen}
        onRequestClose={() => setAddFaqModalIsOpen(false)}
        fetchFaqs={fetchFaqs}
      />
    </div>
  );
};

export default Home;