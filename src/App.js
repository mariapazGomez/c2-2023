import './App.css';
import Search from './components/Search';
import Header from "./components/Header";
import React from "react";
function App() {
  return (
    <div className="App">
      <img src={require('./img/logo.png')} alt="Logo" className="mr-2" style={{ width: '30px', height: '30px' }} />
      <h1>CONTROL 2 TEL-335</h1>
        <Header/>
        <Search/>
    </div>
  );
}

export default App;