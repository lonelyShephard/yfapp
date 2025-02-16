// App.js
import React from 'react';
import StockDashboard from './components/StockDashboard';

function App() {
  return (
    <div className="App">
      <StockDashboard />
    </div>
  );  [Unit]
  Description=YFApp Backend
  After=network.target
  
  [Service]
  User=yourusername  # Replace with your username
  WorkingDirectory=/c/Users/user/yfapp/backend  # Corrected path
  ExecStart=/usr/bin/python3 app.py  # Or the path to your Python executable
  Restart=on-failure
  
  [Install]
  WantedBy=multi-user.target
}

export default App;
