import React, { useEffect, useState } from 'react';
import styles from './HTPGame.module.css';
import background from '../../assets/extras/circle.jpg';
import option from '../../assets/extras/options.jpg';
import search from '../../assets/extras/random.gif';
import win from '../../assets/extras/yeah.gif';
import lose from '../../assets/extras/no.gif';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HTPGame = () => {
  const allPokes = useSelector((state) => state.pokemons);
  const navigate = useNavigate();

  let [showPlay, setShowPlay] = useState(true);
  let [showOptions, setShowOptions] = useState(false);
  let [showLose, setShowLose] = useState(false);
  let [showWin, setShowWin] = useState(false);
  let [showImage, setShowImage] = useState(false);

  let [result, setResult] = useState('');
  let [arrayRandom, setArrayRandom] = useState([]);

  const handleClickRandom = () => {
    if (result) {
      let asd = document.getElementById('imagenPokemon');
      asd.setAttribute('src', search);
    }
    setShowImage(false);
    setShowPlay(false);
    setShowOptions(true);
    setShowLose(false);
    setShowWin(false);
    let array = [];
    while (array.length < 5) {
      let index = Math.floor(Math.random() * allPokes.length);
      array.push(allPokes[index]);
    }
    setArrayRandom(array);
  };

  const handleClickValues = (e) => {
    setShowOptions(false);
    setShowImage(true);
    if (e.target.value === result.name) {
      setShowWin(true);
    } else {
      setShowLose(true);
    }
  };

  useEffect(() => {
    setResult(arrayRandom[Math.floor(Math.random() * arrayRandom.length)]);
  }, [arrayRandom]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.htp}>
          <img
            src={background}
            alt='background'
            className={styles.background}
          />
          <div className={styles.center}>
            {result ? (
              <>
                {showImage && (
                  <h3 className={styles.titleImage}>{result.name}</h3>
                )}
                <img
                  src={result.image}
                  alt='imagePoke'
                  className={styles.imageRandom}
                  id='imagenPokemon'
                  style={
                    showImage
                      ? { filter: 'brightness(1)' }
                      : { filter: 'brightness(0)' }
                  }
                />
              </>
            ) : (
              <img
                src={search}
                alt='imagePoke'
                className={styles.imageRandom}
              />
            )}
          </div>
        </div>
        <div className={styles.options}>
          <img src={option} alt='options' className={styles.background} />
          <div className={styles.namesOptions}>
            {result &&
              showOptions &&
              arrayRandom.map((poke) => (
                <button
                  key={poke.name}
                  value={poke.name}
                  onClick={handleClickValues}
                  className={styles.buttonName}
                >
                  {poke.name}
                </button>
              ))}
          </div>

          {showPlay && (
            <button onClick={handleClickRandom} className={styles.buttonName}>
              PLAY
            </button>
          )}

          {showWin && (
            <div className={styles.namesOptions}>
              <h3 className={styles.titleResult}>YOU WIN!!!</h3>
              <img src={win} alt='winImage' className={styles.imageResult} />
              <div className={styles.namesOptionsPlayHome}>
                <button
                  onClick={handleClickRandom}
                  className={styles.buttonName}
                >
                  PLAY AGAIN
                </button>
                <button
                  className={styles.buttonName}
                  onClick={() => navigate('/pokemons')}
                >
                  GO HOME
                </button>
              </div>
            </div>
          )}
          {showLose && (
            <div className={styles.namesOptions}>
              <h3 className={styles.titleResult}>LOSE</h3>
              <img src={lose} alt='loseImage' className={styles.imageResult} />
              <div className={styles.namesOptionsPlayHome}>
                <button
                  onClick={handleClickRandom}
                  className={styles.buttonName}
                >
                  PLAY AGAIN
                </button>
                <button
                  className={styles.buttonName}
                  onClick={() => navigate('/pokemons')}
                >
                  GO HOME
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HTPGame;
