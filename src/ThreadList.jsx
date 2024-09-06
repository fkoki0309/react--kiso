import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
export const ThreadList = (props) => {

  const navigation = useNavigate()
  const onMoveMakePage = () => {
    navigation("/threads/new");
  }


  return <>
    <Header />
    <h2>スレッド一覧</h2>
    {<ul className='threadList'>
      {
        props.threads.map(thread =>
          <li className='threads' key={thread.id}><Link to={"/threads/" + thread.id}>{thread.title}</Link></li>
        )
      }
    </ul>}
    <button className='newThreadButton' onClick={onMoveMakePage}>新規作成</button>

  </>
};

export default ThreadList
