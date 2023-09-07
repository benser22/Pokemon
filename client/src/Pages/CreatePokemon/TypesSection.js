import React from "react";
import styles from "./CreatePokemon.module.css";

function TypesSection({ allTypes, selectedTypes, handleTypeChange }) {
  return (
    <div>
      <h2
        id="pokelabeltypes"
        className={styles.TypeLabel}
        style={{ marginLeft: "50%", marginTop: "0%", fontSize: "1em" }}
      >
        Types
      </h2>
      <div className={styles.checkboxContainer}>
        {allTypes.map((type) => (
          <div key={type.name} className={styles.checkboxGroup}>
            <label htmlFor={"my"+type.name} className={styles.checkboxLabel}>
              <input
                id={"my"+type.name}
                type="checkbox"
                checked={selectedTypes.includes(type.name)}
                onChange={() => handleTypeChange(type.name)}
                style={{ display: "none" }}
              />
              <img
                src={type.image_type}
                alt={type.name}
                style={{ cursor: "pointer" }}
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
  );
}

export default TypesSection;
