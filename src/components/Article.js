import React from "react";
import { Link } from "react-router-dom";


export default function Article({
  flags,
  name,
  population,
  region,
  subregion,
}) {
  return (
      <Link to={`/${name.common}`}>
              <img src={flags.svg} width='30%' alt=""/>
              <div>
                <h2>{name.common}</h2>
                <ul>
                  <li>Population: {population.toLocaleString()}</li>
                  <li>Region: {region}</li>
                  <li>Subregion: {subregion}</li>
                 </ul>
              </div>
      </Link>
  );
}