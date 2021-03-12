import React, { useContext } from 'react';
import { SongContext } from '../contexts/SongContext';

const LibrarySong = ({song}) => {

    const {setCurrentSong, currentSong} = useContext(SongContext);

    return currentSong ? (
        <div className={`library-song ${currentSong.id === song.id ? 'selected': ''}`} 
            onClick={() =>{ setCurrentSong(song)}} >
            <img src={song.cover} alt={song.name} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
        ) : (
            <div className="empty"></div>
    );
}

export default LibrarySong;