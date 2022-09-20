import React, {useContext} from 'react';
import { LoggedInContext } from './Helper/Context';
import {Navigate} from 'react-router-dom';



function Home() {
  
  const {LoggedIn, setLoggedIn} = useContext(LoggedInContext);

  if (!LoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <center>
      <div>
        <h1>Welcome to my CRUD Application</h1>
        {LoggedIn ? <h1>you are logged in</h1> : <h1>you are Not logged in</h1>}
      </div>
    </center>
  );
};

export default Home;