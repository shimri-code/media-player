import React, { useContext } from 'react';
import { SongContext } from '../contexts/SongContext';

const Song = () => {

    const {currentSong, isPlaying} = useContext(SongContext);

    return(
         <div className="song-container">
             {currentSong && <img className={isPlaying ? "rotateSong" : ""} src={currentSong.cover} alt={currentSong.name} />}
             {currentSong && <h2>{currentSong.name}</h2> }
             {currentSong && <h3>{currentSong.artist}</h3> }
        </div>
    );
}

export default Song;