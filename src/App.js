import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import './App.css';
import './styles/general.css';
import Home from './components/Home';
import Battle from './components/Battle';
import Auth from './components/Auth';

const stats = require('./data/stats.json');

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth/>
  }, {
    path: "/home",
    element: <Home stats={stats}/>
  }, {
    path: "/battle/:id",
    element: <Battle stats={stats}/>
  }
]);

export const StatsContext = React.createContext({});

function App() {

  const [statsValue, setStatsValue] = React.useState({
    exp: 0,
    level: 1,
    money: 0
  });

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <StatsContext.Provider value={[statsValue, setStatsValue]}>
        <div className="App">
          <div className="App-title">
            Simulation combat style RPG
          </div>
          <RouterProvider router={router} />
        </div>
      </StatsContext.Provider>
    </GoogleOAuthProvider>

  );
}

export default App;
