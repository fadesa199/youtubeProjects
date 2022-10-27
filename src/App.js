import React, { useState, useEffect } from 'react';
import './index.scss';
import { Collection } from './Collection'

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1);

  useEffect(() => {
    const category = categoryId ? `category=${categoryId}` : '';
    setIsLoading(true);
    fetch(`https://635a2cfb38725a1746bf71fe.mockapi.io/collections?page=${page}&limit=3&${category}`)
      .then(res => res.json())
      .then(res => setCollections(res))
      .finally(() => setIsLoading(false))
  }, [categoryId, page])




  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => (<li onClick={() => setCategoryId(i)} className={categoryId === i ? 'active' : ''} key={i}>{obj.name}</li>))}
        </ul>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идёт загрузка...</h2>
        ) : (
          collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase())).map((obj, i) => (<Collection key={i} name={obj.name} images={obj.photos} />))
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((obj, i) => (<li key={i} className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</li>))}
      </ul>
    </div>
  );
}

export default App;
