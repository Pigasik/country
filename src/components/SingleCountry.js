import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleCountry() {
  const [country, setCountry] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const getSingleCountry = async () => {
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();
        setCountry(data);
    };

    getSingleCountry();
  }, [name]);

  useEffect(() => {
    document.title = `Countries | ${name}`;
  }, [name]);

  return (
    <>
      <section>
        {country.map((item) => (
          <div key={item.population}>
            <article>
              <img src={item.flags.svg} alt={item.name.common} />
            </article>

            <article>
              <h1>
                {item.name.official}
              </h1>

              <ul>
                <li>Capital: {item.capital[0]}</li>
                <li>Population: {item.population.toLocaleString()}</li>
                <li>Region: {item.region}</li>
                <li>Subregion: {item.subregion}</li>
              </ul>

              {item.borders && (
                <>
                  <h3>
                    Borders:
                  </h3>
                  <ul>
                    {item.borders.map((border, index) => (
                      <li key={index}>
                        {border}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <Link to="/">
                &larr; Back
              </Link>
            </article>
          </div>
        ))}
      </section>
    </>
  );
}