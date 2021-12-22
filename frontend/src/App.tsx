import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


const submitValue = () => {
  console.log('asdf')
}

const App: React.FC = () => {
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={submitValue}>Submit</button>
    </div>
  );
};

export default App;
