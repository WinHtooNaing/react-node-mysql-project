import { useState ,useRef} from "react";
import './dashboard.css'
function Dashboard() {
  const [currentMusicDetails,setCurrentMusicDetails] = useState({
    songName : "စံပယ်ဖြူလေးနဲ့ တွေ့တယ့်နောက်",
    songArtist : "g fatt",
    songSrc : "sapalephyulaynae.m4a",
    songAvatar : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg'
})
const currentAudio = useRef();
const [audioProgress, setAudioProgress] = useState(0);
const [isAudioPlaying , setIsAudioPlaying] = useState(false);
const [musicIndex, setMusicIndex] = useState(0);
const [musicTotalLength , setMusicTotalLength] = useState('04 : 38');
const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");


const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
}

let avatarClass = ['objectFitCover','objectFitContain','none'];
const [avatarClassIndex,setAvatarClassIndex] = useState(0);

const handleAvatar = ()=> {
    if(avatarClassIndex >= avatarClass.length -1){
        setAvatarClassIndex(0);
    }else{
        setAvatarClassIndex(avatarClassIndex +1)
    }
}
const handleAudioPlay = () => {
    if(currentAudio.current.paused) {
        currentAudio.current.play();
        setIsAudioPlaying(true);
    }else{
        currentAudio.current.pause();
        setIsAudioPlaying(false)
    }
}

const musicAPI = [
  {
      songName : "စံပယ်ဖြူလေးနဲ့ တွေ့တယ့်နောက်",
  songArtist : "g fatt",
  songSrc : "./music/sapalephyulaynae.m4a",
  songAvatar : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg',
  },
  {
    songName : "accident",
songArtist : "Big Bag",
songSrc : "./music/accident.m4a",
songAvatar : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg',
},
{
  songName : "Dandelions",
songArtist : "unknown",
songSrc : "./music/dandelions.m4a",
songAvatar : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg',
},
{
  songName : "Happier",
songArtist : "unknown",
songSrc : "./music/happier.m4a",
songAvatar : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg',
},
{
  songName : "radio",
songArtist : "g fatt",
songSrc : "./music/radio.m4a",
songAvatar : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg',
},
]
const handleNextSong= () => {
  if(musicIndex >= musicAPI.length -1){
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
  }else {
      let setNumber = musicIndex +1;
      setMusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
  }
}
const handlePrevSong = () => {
  if(musicIndex === 0){
      let setNumber = musicAPI.length -1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
  }else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
  }
}
const updateCurrentMusicDetails = (number) => {
  let musicObject = musicAPI[number];
  currentAudio.current.src = musicObject.songSrc;
  currentAudio.current.play();
  setCurrentMusicDetails({
      songName : musicObject.songName,
      songArtist :musicObject.songArtist,
      songSrc : musicObject.songSrc,
      songAvatar : musicObject.songAvatar,
  })
  setIsAudioPlaying(true);
  

}
const handleAudioUpdate = () => {
  let minutes = Math.floor(currentAudio.current.duration / 60);
  let seconds= Math.floor(currentAudio.current.duration % 60);
  let musicTotalLength0 = `${minutes < 10 ? `0${minutes}`: minutes} : ${seconds <10 ?`0${seconds}`: seconds}`;
  setMusicTotalLength(musicTotalLength0);

  // input music current time
  let currentMin = Math.floor(currentAudio.current.currentTime / 60);
  let currentSec= Math.floor(currentAudio.current.currentTime % 60);
  let musicCurrentT = `${currentMin < 10 ? `0${currentMin}`: currentMin} : ${currentSec <10 ?`0${currentSec}`: currentSec}`;
  setMusicCurrentTime(musicCurrentT);

  const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
  setAudioProgress(isNaN(progress) ? 0 : progress)
}

  
  return (
    <>
            <div className="containermusic">
                <audio src='./music/sapalephyulaynae.m4a' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
               
                <div className="blackScreen"></div>
                <div className="music-container">
                    <p className="musicPlayer">Music Player</p>
                    <p className="music-Head-Name">{currentMusicDetails.songName}</p>
                    <p className="music-Artist-Name">{currentMusicDetails.songArtist}</p>
                    <img src={currentMusicDetails.songAvatar} className={avatarClass[avatarClassIndex]} 
                    onClick={handleAvatar} alt="son Avaar" id='songAvatar' />
                    <div className="musicTimerDiv">
                        <p className="musicCurrentTime">{musicCurrentTime}</p>
                        <p className="musicTotalLength">{musicTotalLength}</p>
                    </div>
                    <input type="range" name='musicProgressBar' className='musicProgressBar' value={audioProgress}
                    onChange={handleMusicProgressBar} />
                    <div className="musicControlers">
                        <i className="fa-solid fa-backward musicControler" onClick={handlePrevSong}></i>
                        <i className={`fa-solid ${isAudioPlaying ? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
                        <i className="fa-solid fa-forward musicControler" onClick={handleNextSong}></i>
                    </div>
                </div>
                
            </div>
        </>
  )
}

export default Dashboard;