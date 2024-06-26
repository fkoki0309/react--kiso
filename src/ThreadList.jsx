import { useEffect, useState } from 'react';
import './App.css';

export const ThreadList = () => {
  const [threads, setThread] = useState([]);

  useEffect(() => {
    fetch('https://railway.bulletinboard.techtrain.dev/threads?offset=1', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setThread(data);
      })
      .catch(error => {
        console.error('Error fetching thread:', error);
      });
  }, []);

  if (!threads) {
    return <div>Loading...</div>;
  }
  console.log(threads.title);

  return <>
    <ul>
      {
        threads.map(thread =>
          <li className='threadList' key={thread.id}>{thread.title}</li>
        )
      }
    </ul>

  </>
};

export default ThreadList
