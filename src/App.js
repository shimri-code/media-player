import "./styles/app.scss";

import React, {useState} from 'react';

import Song from './components/Song';
import Player from './components/Player';
import Library from "./components/Library";
import Nav from "./components/Nav";
import SongContextProvider from "./contexts/SongContext";

function App() {

  // States
  const[libraryStatus , setLibraryStatus] = useState(false);

  return (
    <div  className={`App ${libraryStatus ? "library-active" : ""}`}>
      
      <Nav libraryStatus = {libraryStatus} 
           setLibraryStatus = {setLibraryStatus} />

      <SongContextProvider>

        <Song />
        <Player />
        <Library libraryStatus = {libraryStatus} />

      </SongContextProvider>

    </div>
  );
}

export default App;