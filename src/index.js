import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const soundBank = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  },
];

const App = () => {
  const soundContainer = React.useRef(null);
  const [soundPlayed, setSoundPlayed] = React.useState('');

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPressed);
  }, []);

  const handleKeyPressed = (e) => {
    const allSounds = [...soundContainer.current.children];
    allSounds.forEach((item) => {
      if (Number(item.dataset.label) === e.keyCode) {
        item.classList.add('active');
        setSoundPlayed(item.id);
        const sound = item.children[1];
        sound.play();
        setTimeout(() => {
          item.classList.remove('active');
        }, 100);
      }
    });
  };

  const playSound = (e) => {
    const item = e.currentTarget;
    setSoundPlayed(item.id);
    const sound = item.children[1];
    sound.play();
  };

  return (
    <section id="drum-machine">
      <div className="drum-pad-container" ref={soundContainer}>
        {soundBank.map((sound) => {
          const { keyCode, keyTrigger, id, url } = sound;
          return (
            <div
              className="drum-pad"
              id={id}
              key={keyCode}
              data-label={keyCode}
              onClick={playSound}
            >
              <h2>{keyTrigger}</h2>
              <audio src={url} className="clip" id={keyTrigger}></audio>
            </div>
          );
        })}
      </div>
      <div className="display-container" id="display">
        <h3>{soundPlayed}</h3>
      </div>
    </section>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
