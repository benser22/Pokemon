import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CreatePokemon.module.css";
import { postPokemon } from "../../redux/actions/actions";
import { useNavigate, NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import validateForm from "./validateForm";
import PokemonForm from "./PokemonsForm";
import TypesSection from "./TypesSection";

function CreatePokemon() {
  const allTypes = useSelector((state) => state.allTypes);
  // me traigo los types de redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [minTypes, setMinTypes] = useState(false);
  const [validation, setValidation] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm({
      name,
      img,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    if (Object.keys(validationErrors).length > 0) {
      setValidation(validationErrors);
      // si hay algun error en los campos, no me dejará avanzar en el submit
      return;
    }

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

    // compruebo que al menos haya seleccionado 1 type
    if (selectedTypes.length === 0) {
      setMinTypes(true);
      setTimeout(() => {
        setMinTypes(false);
      }, 2000);
      return;
    }

    // Si todo está en orden, agrego el nuevo Pokemón!!
    dispatch(postPokemon(newPokemon));
    setSuccessMessage("Pokemon successfully created!");
    setTimeout(() => {
      setSuccessMessage("");
      navigate("/home");
    }, 2000);
  };

  // mantengo actualizado los valores del nuevo pokemon a medida que cambian en el input
  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "hp":
        setHp(value);
        break;
      case "attack":
        setAttack(value);
        break;
      case "defense":
        setDefense(value);
        break;
      case "speed":
        setSpeed(value);
        break;
      case "height":
        setHeight(value);
        break;
      case "weight":
        setWeight(value);
        break;
      case "img":
        setImg(value);
        break;
      default:
        break;
    }
  };

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type)); // me quedo con los types seleccionados si es que los hubiera
    } else if (selectedTypes.length === 2) {
      // controlo que no haya seleccionado mas de 2 types
      setMaxTypes(true);
      setTimeout(() => {
        setMaxTypes(false);
      }, 2000);
    } else {
      setSelectedTypes([...selectedTypes, type]); // update de los types seleccionados
    }
  };

  return (
    <div className={styles.Overlay}>
      <div className={styles.formContainer}>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        <PokemonForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange} // con esta función voy a tener actualizado los valores del nuevo Poke
          name={name}
          hp={hp}
          attack={attack}
          defense={defense}
          img={img}
          speed={speed}
          height={height}
          weight={weight}
          validation={validation}
          setImg={setImg} // paso esta funcion porque con el checkbox setearé img dinámicamente
        />

        <TypesSection
          allTypes={allTypes}
          selectedTypes={selectedTypes}
          handleTypeChange={handleTypeChange}
          img={img}
        />

        {/* Mensajes de error de validaction de los types */}
        {maxTypes && (
          <h2 className={styles.errorMessage}>
            Only 2 types can be chosen at most
          </h2>
        )}
        {minTypes && (
          <h2 className={styles.errorMessage}>Must have at least one type</h2>
        )}
        <NavLink to="/home" className={styles.navLink}>
          <FaTimes title="Close" />
        </NavLink>
      </div>
    </div>
  );
}

export default CreatePokemon;
