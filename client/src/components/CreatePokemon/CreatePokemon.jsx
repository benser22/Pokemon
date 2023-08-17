import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CreatePokemon.module.css";
import axios from "axios";
function CreatePokemon() {
  // busco del estado de redux todos los types de los pokemones, que ya vienen con su imagen
  const allTypes = useSelector((state) => state.allTypes);

  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [hp, setHp] = useState(0);
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [maxTypes, setMaxTypes] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPokemon = {
      name,
      img,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types: selectedTypes,
      created: true, 
    };

    try {
      await axios.post("http://localhost:3001/pokemons/", newPokemon);
      setSuccessMessage("Pokemon successfully created!");
      clearFields();
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
      setSuccessMessage("");
    }
  };

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else if (selectedTypes.length < 2) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setMaxTypes(true);
      setTimeout(() => {
        setMaxTypes(false);
      }, 2000);
    }
  };

  const clearFields = () => {
    setName("");
    setImg("");
    setHp(0);
    setAttack(0);
    setDefense(0);
    setSpeed(0);
    setHeight(0);
    setWeight(0);
    setSelectedTypes([]);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>Create new Pokemon</h2>
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nombre:</label>
          <input
            className={styles.formInput}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className={styles.formLabel}>HP:</label>
          <input
            className={styles.formInput}
            type="number"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Ataque:</label>
          <input
            className={styles.formInput}
            type="number"
            value={attack}
            onChange={(e) => setAttack(e.target.value)}
          />
          <label className={styles.formLabel}>Defensa:</label>
          <input
            className={styles.formInput}
            type="number"
            value={defense}
            onChange={(e) => setDefense(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Velocidad:</label>
          <input
            className={styles.formInput}
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <label className={styles.formLabel}>Altura:</label>
          <input
            className={styles.formInput}
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Peso:</label>
          <input
            className={styles.formInput}
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <label className={styles.formLabel}>Imagen:</label>
          <input
            className={styles.formInput}
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div style={{ width: "90%", marginBottom: "3%" }}>
          <label
            className={styles.formLabel}
            style={{ marginLeft: "38%", marginTop: "5%", fontSize: "1.5em" }}
          >
            Types
          </label>
          <div className={styles.checkboxContainer}>
            {allTypes.map((type) => (
              <div key={type.name} className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type.name)}
                    onChange={() => handleTypeChange(type.name)}
                    style={{ display: "none" }}
                  />
                  <img
                    src={type.image_type}
                    alt={type.name}
                    className={`${styles.typeImage} ${
                      selectedTypes.includes(type.name)
                        ? styles.typeImageSelected
                        : ""
                    }`}
                    title={type.name.toUpperCase()}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
        {maxTypes && (
          <h2 className={styles.errorMessage}>
            Only 2 types can be chosen at most
          </h2>
        )}
        <button className={styles.formButton} type="submit">
          Crear Pokemon
        </button>
      </form>
    </div>
  );
}
export default CreatePokemon;
