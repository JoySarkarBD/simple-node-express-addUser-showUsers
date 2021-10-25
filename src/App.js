import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef('');
  const emailRef = useRef('');

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email }
    // const newUser = { name, email }

    //send data to server
    fetch(`http://localhost:5000/users`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newUser),
      })

      .then((res) => res.json())
      .then(data => {
        console.log(data)
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers)
      });

    console.log(nameRef.current.value, emailRef.current.value);
    e.preventDefault()
    nameRef.current.value = "";
    emailRef.current.value = "";

  }

  return (
    <div className="App">
      <h1>Found Users: {users.length}</h1>
      <form onClick={handleAddUser}>
        <input type="text" ref={nameRef} placeholder="Name" />
        <input type="email" ref={emailRef} placeholder="Email" />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <ol key={user.id}>{user.name}</ol>)
        }
      </ul>
    </div>
  );
}

export default App;
