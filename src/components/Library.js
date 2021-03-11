import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, libraryStatus, currentSong}) => {

    return(
        <div className={`library ${libraryStatus? 'active-library' : ''}`}>
            {songs && songs.map((song) => ( 
                <LibrarySong key={song.id} 
                            song={song}
                            setCurrentSong = {setCurrentSong}
                            currentSong = {currentSong}
                            />
            ))}
        </div>
    );
}

export default Library;