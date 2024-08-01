import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
export const ThreadList = () => {

  const navigation = useNavigate()
  const onMovePage = () => {
    navigation("/threads/new");
  }
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
    <Header />
    <h2>スレッド一覧</h2>
    <ul>
      {
        threads.map(thread =>
          <li className='threadList' key={thread.id}>{thread.title}</li>
        )
      }
    </ul>
    <button className='newThreadButton' onClick={onMovePage}>新規作成</button>

  </>
};

export default ThreadList
