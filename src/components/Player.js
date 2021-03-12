import React, { useContext, useRef , useState} from 'react';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,
         faAngleLeft,
         faAngleRight,
         faPause,
         faVolumeDown
        } from '@fortawesome/free-solid-svg-icons';

import { SongContext } from '../contexts/SongContext';

const Player = () => {

    const {isPlaying, setIsPlaying, currentSong, switchSongsHandler} = useContext(SongContext);

    // States
    const [activeVolume, setActiveVolume] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration : 0,
        animationPercentage: 0,
        volume: 0,
    })

    // Ref 
    const audioRef = useRef(null);

    // Events
    const changeVolume = (e) => 
    {
        let value = e.target.value;
        audioRef.current.volume = value;
        setSongInfo({ ...songInfo, volume: value });
    };

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

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
      };

    const getTime = (time) =>{
       return(Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2));
    }

    const timeUpdateHandler = (e) => {

        const currentTime = e.target.currentTime;
        const duration = e.target.duration;

        const roundedCurrent = Math.round(currentTime);
        const roundedDuration = Math.round(duration);
        const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);

        setSongInfo({...songInfo, currentTime ,duration,animationPercentage });
    }

    const dragHandler = (e) => 
    {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime:e.target.value});
    }

    const playLoadHandler = () => {
        isPlaying ? audioRef.current.play(): audioRef.current.pause()
    }

    return(
        <div className="player">
            
            <div className="time-control">
                <p>{getTime(songInfo.currentTime ?? 0)}</p>
                {currentSong && < div style={{background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,}} className="track">
                    <input  type="range" min="0" 
                            value={songInfo.currentTime} 
                            max={songInfo.duration.toString()} 
                            onChange ={ dragHandler }
                            /> 

                    <div style={trackAnim} className="animate-track"></div>
                </div> }
                <p>{songInfo.duration ? getTime(songInfo.duration ?? 0): '0:00'}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon className='skip-back' 
                                 onClick= {() => {skipTrackHandler('skip-back')}}
                                size='2x' icon={faAngleLeft} />

                <FontAwesomeIcon onClick={playSongHandler}  className='play' size='2x' 
                                 icon={isPlaying ? faPause: faPlay} />

                <FontAwesomeIcon className='skip-forward' size='2x' 
                                 onClick= {() => {skipTrackHandler('skip-forward')}}
                                 icon={faAngleRight} />
                                  
                <FontAwesomeIcon onClick={() => setActiveVolume(!activeVolume)}
                                 icon={faVolumeDown}
                />
                 {activeVolume && (
                    <input
                        onChange={changeVolume}
                        value={songInfo.volume}
                        max="1"
                        min="0"
                        step="0.01"
                        type="range"
                    />
                    )}
            </div>
          
           {currentSong &&  <audio  ref={audioRef} 
                    onLoadedMetadataCapture={playLoadHandler}
                    onTimeUpdate={timeUpdateHandler} 
                    onLoadedMetadata={timeUpdateHandler} 
                    src={currentSong.audio}></audio> }
        </div>
    );
}

export default Player;