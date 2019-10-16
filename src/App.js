import React from 'react';
import './App.css';
import Main from "./Components/Main";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
        <ToastContainer />
      <Main/>
    </div>
  );
}

export default App;
