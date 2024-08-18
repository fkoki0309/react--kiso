import './App.css';
import Header from './Header';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MakeThread() {
  const [newThread, setNewThread] = useState("");
  const navigate = useNavigate();

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          size="40"
          id='post'
          placeholder='スレッドタイトル'
          value={newThread}
          onChange={makeNewThread}
        />
        <div>
          <input type="submit" value="作成" id="checkButton" />
        </div>
      </form>
    </>
  );
}

export default MakeThread;
