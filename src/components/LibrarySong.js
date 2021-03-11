import React from 'react';

const LibrarySong = ({song, setCurrentSong, currentSong}) => {
    return(
        <div className={`library-song ${currentSong.id === song.id ? 'selected': ''}`} 
            onClick={() =>{ setCurrentSong(song)}} >
            <img src={song.cover} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default LibrarySong;