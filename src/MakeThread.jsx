import './App.css';
import Header from './Header';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MakeThread() {
  const [newThread, setNewThread] = useState("");
  const navigate = useNavigate();
  const onMovePage = () => {
    navigate("/");
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://railway.bulletinboard.techtrain.dev/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newThread }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setNewThread("");
        navigate('/'); //作成すると一覧を表示
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const makeNewThread = (e) => {
    setNewThread(e.target.value);
  };

  return (
    <>
      <Header />
      <h2>スレッド新規作成</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className='makeNewThreadButton'
          size="40"
          id='post'
          placeholder='スレッドタイトル'
          value={newThread}
          onChange={makeNewThread}
        />
        <div>
          <input className='checkButton' type="submit" value="作成" id="checkButton" />
        </div>
      </form>
      <button className='returnButton' onClick={onMovePage}>Topに戻る</button>
    </>
  );
}

export default MakeThread;
