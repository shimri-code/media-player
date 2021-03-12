import React, {createContext, useEffect, useState } from 'react';
// import uuid from 'uuid/dist/v1';

// Step 1 - create context 
export const SongContext = createContext();

// Step 2 - Provider
const SongContextProvider = (props) => {

    const switchSongsHandler = (dir) =>
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
        newIndex = (currentIndex === 0) ? songs.length -1  : currentIndex - 1;
      }
      
       setCurrentSong(songs[newIndex]);
    }

    // Add Effect 
    useEffect(()=>
    {
        fetch('http://localhost:8000/songs')
        .then(response => 
        {
            return response.json();
        })
        .then(data =>
            {
                setSongs(data);
                setCurrentSong(data[0]);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    // States
    const[songs , setSongs] = useState(null);
    const[currentSong , setCurrentSong] = useState(null);
    const[isPlaying , setIsPlaying] = useState(false);

    // Step 3 Return Provider + children
    return(
        <SongContext.Provider value={{songs, setCurrentSong, currentSong, switchSongsHandler, isPlaying, setIsPlaying,}}>
            {props.children}
        </SongContext.Provider>
    )
}

export default SongContextProvider;