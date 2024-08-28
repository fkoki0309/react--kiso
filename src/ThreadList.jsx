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


  // const [threads, setThread] = useState([]);

  // useEffect(() => {
  //   fetch('https://railway.bulletinboard.techtrain.dev/threads?offset=0')
  //     .then(response => response.json())
  //     .then(data => {
  //       setThread(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching thread:', error);
  //     });
  // }, []);

  // if (!threads) {
  //   return <div>Loading...</div>;
  // }
  // console.log(threads.title);

  return <>
    <Header />
    <h2>スレッド一覧</h2>
    {<ul>
      {
        props.threads.map(thread =>
          <li className='threadList' key={thread.id}><Link to={"/threads/" + thread.id}>{thread.title}</Link></li>
        )
      }
    </ul>}
    <button className='newThreadButton' onClick={onMoveMakePage}>新規作成</button>

  </>
};

export default ThreadList
