import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import { useParams } from 'react-router-dom';

export const ThreadsPages = (props) => {
  const { threads_id } = useParams();
  const [threadData, setThreadData] = useState(null);
  const threadTitle = props.threads?.find(thread => thread.id === threads_id)?.title;
  useEffect(() => {
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threads_id}/posts?offset=0`)
      .then(response => response.json())
      .then(data => {
        setThreadData(data);
      })
      .catch(error => {
        console.error('スレッドの取得中にエラーが発生しました:', error);
      });
  }, [threads_id]);

  if (!threadData) {
    return <div>読み込み中...</div>;
  }

  return (
    <>
      <Header />
      <h2>{threadTitle}</h2>
      <ul>
        {threadData.posts.map(post => (
          <li className='threadList' key={post.id}>
            {post.post}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ThreadsPages;
