import './App.css';

import { createContext, useState } from 'react';
import { Login } from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard';

export const AuthContext = createContext(null);

function App() {
  const userState = useState();
  const [user] = userState;

  return (
    <AuthContext.Provider value={userState}>
      <main className="main">
        {!user ? <Login /> : <Dashboard />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
