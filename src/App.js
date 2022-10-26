import React, { useState, useEffect } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users/Users';



function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [invites, setInvites] = useState([]);
  const [sucess, setSucess] = useState(false)

  const onClickInvited = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else
      setInvites(prev => [...prev, id])
  }



  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(res => { setUsers(res.data) })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, [])

  return (
    <div className="App">
      {sucess ? (<Success count={invites.length} />) :
        (<Users items={users}
          isLoading={isLoading}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          onClickInvited={onClickInvited}
          invites={invites}
          setSucess={setSucess} />
        )}
    </div>
  );
}

export default App;
