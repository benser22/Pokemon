import React from "react";
import styles from "./CreatePokemon.module.css";
import { useEffect, useState } from "react";

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

 const handleImageCheckboxChange = () => {
    setDisableImageInput(!disableImageInput);
  };

  useEffect(()=>{
    disableImageInput ? setImg("default") : setImg(img)
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

  const handleImageInputChange = (value) => {
    if (!disableImageInput) {
      handleInputChange("img", value);
    }
  };

  const handleCheckbox = () => {
    handleImageCheckboxChange(disableImageInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Name:</label>
        <input
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
        <label className={styles.formLabel}>HP (Health Points):</label>
        <input
          className={styles.formInput}
          style={{ marginTop: "-8px" }}
          type="range"
          min="0"
          max="714"
          value={hp}
          onChange={(e) => handleInputChange("hp", e.target.value)}
        />
        <span className={styles.rangeValue}>{hp}</span>
        {displayValidation.hp && (
          <h2 className={styles.errorMessage}>{displayValidation.hp}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Attack:</label>
        <input
          className={styles.formInput}
          style={{ marginTop: "-8px" }}
          type="range"
          min="0"
          max="255"
          value={attack}
          onChange={(e) => handleInputChange("attack", e.target.value)}
        />
        <span className={styles.rangeValue}>{attack}</span>
        {displayValidation.attack && (
          <h2 className={styles.errorMessage}>{displayValidation.attack}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Defense:</label>
        <input
          style={{ marginTop: "-8px" }}
          className={styles.formInput}
          type="range"
          min="0"
          max="255"
          value={defense}
          onChange={(e) => handleInputChange("defense", e.target.value)}
        />
        <span className={styles.rangeValue}>{defense}</span>
        {displayValidation.defense && (
          <h2 className={styles.errorMessage}>{displayValidation.defense}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Speed:</label>
        <input
          className={styles.formInput}
          style={{ marginTop: "-8px" }}
          type="range"
          min="0"
          max="255"
          value={speed}
          onChange={(e) => handleInputChange("speed", e.target.value)}
        />
        <span className={styles.rangeValue}>{speed}</span>
        {displayValidation.speed && (
          <h2 className={styles.errorMessage}>{displayValidation.speed}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Height:</label>
        <input
          className={styles.formInput}
          style={{ marginTop: "-8px" }}
          type="range"
          min="0"
          max="20"
          value={height}
          onChange={(e) => handleInputChange("height", e.target.value)}
        />
        <span className={styles.rangeValue}>{height} mts.</span>
        {displayValidation.height && (
          <h2 className={styles.errorMessage}>{displayValidation.height}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Weight:</label>
        <input
          className={styles.formInput}
          style={{ marginTop: "-8px" }}
          type="range"
          min="0"
          max="1000"
          value={weight}
          onChange={(e) => handleInputChange("weight", e.target.value)}
        />
        <span className={styles.rangeValue}>{weight} kgs.</span>
        {displayValidation.weight && (
          <h2 className={styles.errorMessage}>{displayValidation.weight}</h2>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Url Image:</label>
        <input
          className={styles.formInput}
          type="text"
          value={disableImageInput ? "" : img}
          onChange={(e) => handleImageInputChange(e.target.value)}
          readOnly={disableImageInput}
          style={{
            backgroundColor: disableImageInput ? "darkGray" : "white",
          }}
        />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={disableImageInput}
            onClick={(e) => handleCheckbox(e.target.value)}
            onChange={handleImageCheckboxChange}
          />
          Default Image
        </label>
        {displayValidation.img && (
          <h2 className={styles.errorMessage}>{displayValidation.img}</h2>
        )}
      </div>
      <button className={styles.formButton} type="submit">
        Create Pokemon
      </button>
    </form>
  );
}

export default PokemonForm;
