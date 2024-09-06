import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import { useParams } from 'react-router-dom';

export const ThreadsPages = (props) => {
  const { threads_id } = useParams(); // useParamsでスレッドIDを取得
  const [threadData, setThreadData] = useState(null); // スレッドデータを保存するstate
  const [newPost, setNewPost] = useState(''); // 新しい投稿内容を保存するstate
  const threadTitle = props.threads?.find(thread => thread.id === threads_id)?.title; // スレッドタイトル取得

  // スレッドの投稿データを取得するためのuseEffect
  useEffect(() => {
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threads_id}/posts?offset=0`)
      .then(response => response.json())
      .then(data => {
        setThreadData(data); // 取得したデータをstateに保存
      })
      .catch(error => {
        console.error('スレッドの取得中にエラーが発生しました:', error);
      });
  }, [threads_id]); // threads_idが変わるたびに実行

  // 新しい投稿をサーバーに送信する関数
  const handleSubmit = (e) => {
    e.preventDefault(); // フォームのデフォルトの送信動作をキャンセル

    // POSTリクエストを送信して新しい投稿を追加
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threads_id}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: newPost }), // 新しい投稿内容を送信
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // 新しい投稿を現在のスレッドデータに追加
        setThreadData(prevData => ({
          ...prevData,
          posts: [...prevData.posts, data] // 新しい投稿をposts配列に追加
        }));
        setNewPost(''); // フォームをクリア
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // フォーム入力が変更された時に呼ばれる関数
  const makeNewPost = (e) => {
    setNewPost(e.target.value); // 入力内容をnewPostのstateに保存
  };

  // スレッドデータがまだロードされていない場合の表示
  if (!threadData) {
    return <div>読み込み中...</div>;
  }

  return (
    <>
      <Header />
      <h2>{threadTitle}</h2>
      <ul className='postList'>
        {/* スレッド内の各投稿を表示 */}
        {threadData.posts.map(post => (
          <li className='posts' key={post.id}>
            {post.post}
          </li>
        ))}
      </ul>

      {/* 新しい投稿を作成するためのフォーム */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className='makeNewPostButton'
          size="40"
          id='post'
          placeholder='ポスト'
          value={newPost} // フォームに入力された値
          onChange={makeNewPost} // フォームの入力が変更された時の処理
        />
        <div>
          <input className='postSubmitButton' type="submit" value="作成" id="checkButton" />
        </div>
      </form>
    </>
  );
};

export default ThreadsPages;
