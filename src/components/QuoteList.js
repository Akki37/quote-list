import React, { useState, useEffect } from 'react';
import { getQuotes } from '../api';
import { useNavigate } from 'react-router-dom';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  const fetchQuotes = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await getQuotes(token, 20, offset);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        console.log({data});
        setQuotes((prevQuotes) => ([...prevQuotes, ...data]));
        setOffset(offset + 20);
      }
    } catch (err) {
      console.error('Error fetching quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="quote-list">
      {quotes.map(({ created_at, username, mediaUrl, id, text }) => (
        <div key={id} className="quote-item">
          <div className='image-text-container' style={{ backgroundImage: `url(${mediaUrl})` }}>
            <img src={mediaUrl} alt="Quote media" />
            <div className="overlay">{text}</div>
          </div>
          <div className="quote-footer">
            <p>{username}</p>
            <p>{new Date(created_at).toLocaleString()}</p>
          </div>
        </div>
      ))}
      {token && <button onClick={() => navigate('/quote-creation')} className='floating-btn left-bottom'>Create Quote</button>}
      {hasMore && !loading && <button className='floating-btn right-bottom' onClick={fetchQuotes}>Load More</button>}
      {loading && <button className='floating-btn right-bottom' >Loading...</button>}
      {!hasMore && <p>No more quotes</p>}
    </div>
  );
};

export default QuoteList;
