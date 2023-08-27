import React from "react";
import styles from "./CreatePokemon.module.css";
import { useEffect, useState } from "react";
import pokemonImages from "../../constants/pokeImages"; // Importa el arreglo con las URLs de las imágenes

function PokemonForm({
  handleSubmit,
  handleInputChange,
  name,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  img,
  setImg,
  validation,
}) {
  const [displayValidation, setDisplayValidation] = useState({});
  const [disableImageInput, setDisableImageInput] = useState(false);
  const [randomImage, setRandomImage] = useState(false);
  const numericHeight = parseFloat(height); // Convertir a número

  const handleRandomImageChange = () => {
    setRandomImage(!randomImage);
    if (randomImage) {
      setImg(""); // Limpia la imagen si desactivas "Random image"
    }
  };

  const handleImageCheckboxChange = () => {
    setDisableImageInput(!disableImageInput);
  };

  useEffect(() => {
    disableImageInput ? setImg("default") : setImg(img);
  }, [disableImageInput, img, setImg]);

  useEffect(() => {
    setDisplayValidation(validation);
    const timeout = setTimeout(() => {
      setDisplayValidation({});
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [validation]);

  useEffect(() => {
    if (randomImage) {
      const randomIndex = Math.floor(Math.random() * pokemonImages.length);
      setImg(pokemonImages[randomIndex].url);
    }
  }, [randomImage, setImg]);

  const handleImageInputChange = (value) => {
    if (!disableImageInput && !randomImage) {
      handleInputChange("img", value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="pokename" className={styles.formLabel}>Name:</label>
        <input
          id="pokename"
          className={styles.formInput}
          type="text"
          value={name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        {displayValidation.name && (
          <h2 className={styles.errorMessage}>{displayValidation.name}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pokehp" className={styles.formLabel}>
          HP (Health Points):
        </label>
        <input
          id="pokehp"
          className={styles.formInput}
          style={{ marginTop: "-8px" }}
          type="range"
          min="0"
          max="255"
          value={hp}
          onChange={(e) => handleInputChange("hp", e.target.value)}
        />
        <span id="pokehpspan" className={styles.rangeValue}>
          {hp}
        </span>
        {displayValidation.hp && (
          <h2 className={styles.errorMessage}>{displayValidation.hp}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pokeat" className={styles.formLabel}>
          Attack:
        </label>
        <input
          id="pokeat"
          className={styles.formInput}
          style={{ marginTop: "-8px" }}
          type="range"
          min="0"
          max="255"
          value={attack}
          onChange={(e) => handleInputChange("attack", e.target.value)}
        />
        <span id="pokeatspan" className={styles.rangeValue}>
          {attack}
        </span>
        {displayValidation.attack && (
          <h2 className={styles.errorMessage}>{displayValidation.attack}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pokedef" className={styles.formLabel}>
          Defense:
        </label>
        <input
          id="pokedef"
          style={{ marginTop: "-8px" }}
          className={styles.formInput}
          type="range"
          min="0"
          max="255"
          value={defense}
          onChange={(e) => handleInputChange("defense", e.target.value)}
        />
        <span id="pokedefspan" className={styles.rangeValue}>
          {defense}
        </span>
        {displayValidation.defense && (
          <h2 className={styles.errorMessage}>{displayValidation.defense}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pokesp" className={styles.formLabel}>
          Speed:
        </label>
        <input
          id="pokesp"
          className={styles.formInput}
          style={{ marginTop: "-8px" }}
          type="range"
          min="0"
          max="255"
          value={speed}
          onChange={(e) => handleInputChange("speed", e.target.value)}
        />
        <span id="pokespspan" className={styles.rangeValue}>
          {speed}
        </span>
        {displayValidation.speed && (
          <h2 className={styles.errorMessage}>{displayValidation.speed}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pokehe" className={styles.formLabel}>
          Height:
        </label>
        <input
          id="pokehe"
          className={styles.formInput}
          style={{ marginTop: "-8px" }}
          type="range"
          min="0"
          max="20"
          step="0.1" // Permitir valores decimales con dos decimales
          value={height}
          onChange={(e) => handleInputChange("height", e.target.value)}
        />
        <span id="pokehespan" className={styles.rangeValue}>
          {numericHeight.toFixed(2)} mts.
        </span>
        {displayValidation.height && (
          <h2 className={styles.errorMessage}>{displayValidation.height}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pokewe" className={styles.formLabel}>
          Weight:
        </label>
        <input
          id="pokewe"
          className={styles.formInput}
          style={{ marginTop: "-8px" }}
          type="range"
          min="0"
          max="1000"
          value={weight}
          onChange={(e) => handleInputChange("weight", e.target.value)}
        />
        <span id="pokewespan" className={styles.rangeValue}>
          {weight} kgs.
        </span>
        {displayValidation.weight && (
          <h2 className={styles.errorMessage}>{displayValidation.weight}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="pokeurl" className={styles.formLabel}>
          Url Image:
        </label>
        <input
          id="pokeurl"
          className={styles.formInput}
          type="text"
          value={disableImageInput || randomImage ? "" : img}
          onChange={(e) => handleImageInputChange(e.target.value)}
          readOnly={disableImageInput || randomImage}
          style={{
            backgroundColor:
              disableImageInput || randomImage ? "darkGray" : "white",
          }}
        />
        <label htmlFor="pokecheck1" className={styles.checkboxLabel}>
          <input 
            id="pokecheck1"
            type="checkbox"
            checked={disableImageInput}
            onClick={handleImageCheckboxChange}
            onChange={() => {}}
          />
          Default Image
        </label>
        <label htmlFor="pokecheck2" className={styles.checkboxLabel}>
          <input
            id="pokecheck2"
            type="checkbox"
            checked={randomImage}
            onClick={handleRandomImageChange}
            onChange={() => {}}
          />
          Random Image
        </label>
        {displayValidation.img && (
          <h2 className={styles.errorMessage}>{displayValidation.img}</h2>
        )}
      </div>
      <button id="butonsubmit" className={styles.formButton} type="submit">
        Create Pokemon
      </button>
    </form>
  );
}

export default PokemonForm;
