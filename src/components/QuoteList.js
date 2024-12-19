import React, { useState, useEffect, useCallback } from 'react';
import { getQuotes } from '../api';
import { useNavigate } from 'react-router-dom';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || '';

  const fetchQuotes = useCallback(async (mergeData) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await getQuotes(token, 20, offset);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setQuotes((prevQuotes) => {
          return mergeData ? ([...prevQuotes, ...data]) : data
        });
        setOffset(offset + 20);
      }
    } catch (err) {
      console.error('Error fetching quotes:', err);
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, offset, token]);

  const handleScroll = useCallback(() => {
    const { documentElement = {} } = document || {};
    const { scrollHeight = 0, scrollTop = 0 } = documentElement || {};
    const bottom = Math.floor(scrollHeight) === Math.floor(scrollTop + window?.innerHeight);
    if (bottom && hasMore && !loading) {
      fetchQuotes(true);
    }
  }, [hasMore, loading, fetchQuotes]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchQuotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="quote-list">
      {quotes.filter(({ mediaUrl }) => mediaUrl).map(({ createdAt, username, mediaUrl, id, text }) => (
        <div key={id} className="quote-item">
          <div className='image-text-container'>
            <img src={mediaUrl} alt="Quote media" />
            <div className="overlay">{text}</div>
          </div>
          <div className="quote-footer">
            <p>{username}</p>
            <p>{new Date(createdAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
      {token && <button onClick={() => navigate('/quote-creation')} className='floating-btn right-bottom'>Create Quote</button>}
      {!hasMore && <p>No more quotes</p>}
    </div>
  );
};

export default QuoteList;
