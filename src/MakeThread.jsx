import './App.css'
import Header from './Header'
import { useEffect, useState } from 'react';
import ThreadList from './ThreadList';
function MakeThread() {

  let data = document.getElementById('post');

  useEffect(() => {
    fetch('https://railway.bulletinboard.techtrain.dev/threads', {
      method: 'POST',
      body: data
    })

  }, [])


  return (
    <>
      <Header />
      <input type="text" size="40" id='post' />
      <input type="button" value="Check" id="checkButton" />

    </>
  )
}

export default MakeThread
