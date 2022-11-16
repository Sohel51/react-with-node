import { useEffect, useState } from 'react';
import './App.css';

function App() {
  /* Data loading system
   1.Declaring user State
   2.Import UseState
   3.import UseEffect (use function, use dependency)
   4. use fetch
   
   Example-
      useEffect( () => {
        fetch('use-data-location')
        .then(res => res.json())
        .then(data => setUsers(data));
        }, [])
  */
  const [users, setUsers] = useState([]);

  useEffect( () => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  }, [])

  //Creating EventHandler
  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    console.log(name, email);
    const user = {name, email};

    //Post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      const newUsers =  [...users, data];
      setUsers(newUsers);
      console.log(data);
    })
  }

  return (
    <div className="App">
      {/* Publish the data in UI */}
      <h1>My own data: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Name' required/>
        <input type="text" name='email' placeholder='Email' required/>
        <input type="submit" value='Add User'/>
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>ID: {user.id} Name: {user.name} Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
