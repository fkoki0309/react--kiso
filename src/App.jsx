import { useState, useEffect } from 'react'
import './App.css'
import { ThreadList } from './ThreadList'
import { Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import MakeThread from './MakeThread'
import { ThreadsPages } from './ThreadsPage'
function App() {

  const [threads, setThread] = useState([]);

  useEffect(() => {
    fetch('https://railway.bulletinboard.techtrain.dev/threads?offset=0')
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

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ThreadList threads={threads} />} />
            <Route path="/threads/new" element={<MakeThread />} />
            <Route path={"/threads/:threads_id"} element={<ThreadsPages threads={threads} />} />
          </Routes>
        </BrowserRouter>
      </div>






    </>
  )
}

export default App
