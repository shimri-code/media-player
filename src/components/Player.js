import React, { useRef , useState} from 'react';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,
         faAngleLeft,
         faAngleRight,
         faPause} from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, isPlaying, setIsPlaying, switchSongsHandler} ) => {

    // State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration : 0
    })

    // Ref 
    const audioRef = useRef(null);

    // Events
    const playSongHandler = () => 
    {
        if(!isPlaying)
        {
            audioRef.current.play();
            setIsPlaying(true);
        }
        else
        {
            audioRef.current.pause();
            
            // Restart
            // audioRef.current.load();
            setIsPlaying(false);
        }
    }

    const skipTrackHandler = async (dir) =>
    {
        await switchSongsHandler(dir);
    }

    const getTime = (time) =>{
       return(Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2));
    }

    const timeUpdateHandler = (e) => {

        setSongInfo({...songInfo, currentTime:e.target.currentTime ,duration: e.target.duration});
        // console.log(e.target.duration);
        // console.log(Math.round((e.target.currentTime / e.target.duration) * 100));
    }

    const dragHandler = (e) => 
    {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime:e.target.value});
    }

    return(
        <div className="player">
            <div className="time-control">
                
                <p>{getTime(songInfo.currentTime ?? 0)}</p>
                
                <input  type="range" min="0" 
                        value={songInfo.currentTime ?? 0 } 
                        max={songInfo.duration ?? 0} 
                        onChange ={ dragHandler }
                        /> 

                <p>{songInfo.duration ? getTime(songInfo.duration ?? 0): '0:00'}</p>

            </div>
            <div className="play-control">
                <FontAwesomeIcon className='skip-back' 
                                 onClick= {() => {skipTrackHandler('skip-back')}}
                                size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' 
                                 icon={isPlaying ? faPause: faPlay} />
                <FontAwesomeIcon className='skip-forward' size='2x' 
                                 onClick= {() => {skipTrackHandler('skip-forward')}}
                                icon={faAngleRight} />
            </div>
            <audio  ref={audioRef} 
                    onTimeUpdate={timeUpdateHandler} 
                    onLoadedMetadata={timeUpdateHandler} 
                    src={currentSong.audio}></audio>
        </div>
    );
}

export default Player;