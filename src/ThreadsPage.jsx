import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import { useParams, useNavigate } from 'react-router-dom';

export const ThreadsPages = (props) => {
  const { threads_id } = useParams();
  const [threadData, setThreadData] = useState(null); // スレッドデータを保存するstate
  const [newPost, setNewPost] = useState(''); // 新しい投稿内容を保存するstate
  const threadTitle = props.threads?.find(thread => thread.id === threads_id)?.title;

  const navigate = useNavigate();
  const onMovePage = () => {
    navigate("/");
  }


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

  // 新しい投稿をサーバーに送信する関数
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
        console.log('Success:', data);
        // 新しい投稿を現在のスレッドデータに追加
        setThreadData({
          ...threadData,
          posts: [...threadData.posts, data]
        });
        setNewPost(''); // フォームをクリア
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // フォーム入力が変更された時に呼ばれる関数
  const makeNewPost = (e) => {
    setNewPost(e.target.value);
  };

  if (!threadData) {
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
          placeholder='ポスト'
          value={newPost}
          onChange={makeNewPost}
        />
        <div>
          <input className='postSubmitButton' type="submit" value="作成" id="checkButton" />
        </div>
      </form>

      <button className='returnButton' onClick={onMovePage}>Topに戻る</button>

    </>
  );
};

export default ThreadsPages;
