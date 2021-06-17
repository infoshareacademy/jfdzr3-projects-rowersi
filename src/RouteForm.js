import { useState } from "react";

export const RouteForm = () => {
  const [name, setName] = useState("");
  const [distance, setDistance] = useState("");
  const [difficulty, setDifficulty] = useState("");

const nameHandler=(event) => {
// console.log(event.target.value)
setName(event.target.value)
};
console.log(name)

  return (
  <form>
    <label htmlFor="name">Name</label>
    <input id="name" onChange={nameHandler}/>
    <label htmlFor="distance">Distance</label>
    <input id="distance" />
    <label htmlFor="difficulty">Difficulty</label>
    <input id="difficulty" />
  </form>
);
};


