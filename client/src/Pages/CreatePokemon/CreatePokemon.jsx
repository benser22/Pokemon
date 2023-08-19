import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CreatePokemon.module.css";
import { postPokemon } from "../../redux/actions/actions";
import { useNavigate, NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import validateForm from "./validateForm";
import PokemonForm from "./PokemonsForm";
import TypesSection from "./TypesSection";

function CreatePokemon() {
  const allTypes = useSelector((state) => state.allTypes);
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
  const [disableImageInput, setDisableImageInput] = useState(false);
  const [validation, setValidation] = useState({});

  const handleImageCheckboxChange = () => {
    setDisableImageInput(!disableImageInput);
  };

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

    if (selectedTypes.length === 0) {
      setMinTypes(true);
      setTimeout(() => {
        setMinTypes(false);
      }, 2000);
      return;
    }
    dispatch(postPokemon(newPokemon));

    setSuccessMessage("Pokemon successfully created!");
    clearFields();
    setTimeout(() => {
      setSuccessMessage("");
      navigate("/home");
    }, 2000);
  };

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
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else if (selectedTypes.length === 2) {
      setMaxTypes(true);
      setTimeout(() => {
        setMaxTypes(false);
      }, 2000);
    } else {
      setSelectedTypes([...selectedTypes, type]);
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
    <div className={styles.Overlay}>
      <div className={styles.formContainer}>
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        <PokemonForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleImageCheckboxChange={handleImageCheckboxChange}
          name={name}
          hp={hp}
          attack={attack}
          defense={defense}
          img={img}
          setImg={setImg}
          speed={speed}
          height={height}
          weight={weight}
          disableImageInput={disableImageInput}
          validation={validation}
        />

        <TypesSection
          allTypes={allTypes}
          selectedTypes={selectedTypes}
          handleTypeChange={handleTypeChange}
          img={img}
        />
        {maxTypes && (
          <h2 className={styles.errorMessage}>Only 2 types can be chosen at most</h2>
        )}
        {minTypes && (
          <h2 className={styles.errorMessage}>Must have at least one type</h2>
        )}
        <NavLink to="/home" className={styles.navLink}>
          <FaHome title="Back to Home" />
        </NavLink>
      </div>
    </div>
  );
}

export default CreatePokemon;
