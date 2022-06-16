import { animals } from './animals';
import React from 'react';
import ReactDOM from 'react-dom';

const title = "";

const background = <img  className = 'background' alt = 'sky' src ='/images/sky.jpg' />;

const img_arr = [];
for (const animal in animals) {
  img_arr.push(<img src = {animal.image}
  key = {animal} className = 'animal' alt = {animal} aria-label = {animal} role = 'button' onClick = {displayFact}/>)
};

const animalFacts = (
<div>
<h1>{title === "" ? "Click an animal for a fun fact" : title} </h1>
{background}

<div className = 'animals'>
{img_arr}
</div>
<p id = 'fact'></p>

</div>

);


function displayFact(e) {
  const selectedAnimal = e.target.alt;
  const animalInfo = animals[selectedAnimal];
  const optionIndex = Math.floor(Math.random() * animalInfo.facts.length);
  
  const fact = animalInfo.facts[optionIndex];
  let changeThis = document.getElementById('fact');
  changeThis.innerHTML = fact;
}

ReactDOM.render(animalFacts, document.getElementById('root'));
