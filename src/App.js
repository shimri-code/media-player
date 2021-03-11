import "./css/modules/app.css";

import React, {useState, useEffect} from 'react';

import Song from './components/Song';
import Player from './components/Player';
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {

  // States
  const[songs , setSongs] = useState(null);
  const[currentSong , setCurrentSong] = useState(null);
  const[isPlaying , setIsPlaying] = useState(false);
  const[libraryStatus , setLibraryStatus] = useState(false);

  useEffect(()=>
    {
        fetch('http://localhost:8000/songs').
        then(response => 
        {
            return response.json();
        }).
        then(data =>
          {
            setSongs(data);
            setCurrentSong(data[0]);
          })
    }, [])

  const switchSongsHandler = async (dir) =>
  {
    let currentIndex = songs.indexOf(currentSong);
    let newIndex = 0;

    console.log(dir);

    // Foreward
    if(dir === 'skip-forward')
    {
      newIndex = (currentIndex + 1) % songs.length;
    }
    else
    {
      newIndex = (currentIndex == 0) ? songs.length -1  : currentIndex - 1;
    }
    
    await setCurrentSong(songs[newIndex]);
  }

  return (
    <div className="App">
      <Nav libraryStatus = {libraryStatus} 
           setLibraryStatus = {setLibraryStatus} />
      {currentSong && <Song currentSong ={ currentSong } />}
      {currentSong && <Player currentSong ={ currentSong }
                              isPlaying ={ isPlaying }
                              setIsPlaying ={ setIsPlaying }
                              switchSongsHandler = {switchSongsHandler}
                        />}
      {songs && <Library currentSong= {currentSong} 
                        songs={songs} setCurrentSong={setCurrentSong} 
                        libraryStatus = {libraryStatus} />}
    </div>
  );
}

export default App;