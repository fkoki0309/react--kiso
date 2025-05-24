import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import { useParams, useNavigate } from 'react-router-dom';

export const ThreadsPages = (props) => {
  const { threads_id } = useParams();
  const [threadData, setThreadData] = useState(null);
  const [newPost, setNewPost] = useState('');
  const threadTitle = props.threads?.find(thread => thread.id === threads_id)?.title;

  const navigate = useNavigate();

  const goToTopPage = () => {
    navigate("/");
  };

  useEffect(() => {
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threads_id}/posts?offset=0`)
      .then(response => response.json())
      .then(data => {
        console.log('取得したスレッドデータ:', data);
        setThreadData(data);
      })
      .catch(error => {
        console.error('スレッドの取得中にエラーが発生しました:', error);
      });
  }, [threads_id]);

  const handleSubmit = (e) => {
    e.preventDefault();


    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threads_id}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: newPost }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('新しい投稿の送信が成功しました:', data);
        setThreadData({
          ...threadData,
          posts: [...threadData.posts, data]
        });
        setNewPost('');
      })
      .catch((error) => {
        console.error('投稿の送信中にエラーが発生しました:', error);
      });
  };

  const makeNewPost = (e) => {
    setNewPost(e.target.value);
  };

  if (!threadData || !threadData.posts) {
    return <div>読み込み中...</div>;
  }

  return (
    <>
      <Header />
      <h2>{threadTitle}</h2>

      <ul className='postList'>
        {threadData.posts.map(post => (
          <li className='posts' key={post.id}>
            {post.post}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className='makeNewPostButton'
          size="40"
          id='post'
          placeholder='新しい投稿'
          value={newPost}
          onChange={makeNewPost}
        />
        <div>
          <input className='postSubmitButton' type="submit" value="投稿する" id="checkButton" />
        </div>
      </form>

      <button className='returnButton' onClick={goToTopPage}>Topに戻る</button>
    </>
  );
};

export default ThreadsPages;
