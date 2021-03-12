import React, { useContext } from 'react';
import { SongContext } from '../contexts/SongContext';
import LibrarySong from './LibrarySong';

const Library = ({libraryStatus}) => {

    const {songs} = useContext(SongContext);

    return(
        <div className={`library ${libraryStatus? 'active-library' : ''}`}>
            {songs && songs.map((song) => ( 
                <LibrarySong key={song.id} 
                            song={song}
                            />
            ))}
        </div>
    );
}

export default Library;