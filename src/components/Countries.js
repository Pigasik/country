import { useState, useEffect } from "react";
import Article from "./Article";
import styles from './Country.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const regions = [
    {
      name: "Europe",
    },
    {
      name: "Asia",
    },
    {
      name: "Africa",
    },
    {
      name: "Oceania",
    },
    {
      name: "Americas",
    },
    {
      name: "Antarctic",
    },
  ];

  useEffect(() => {
    document.title = `Showing All Countries`;
  }, []);

  useEffect(() => {
    const getCountries = async () => {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
    };
    getCountries();
  }, []);

  async function searchCountry() {
      const res = await fetch(`https://restcountries.com/v3.1/name/${searchText}`);
      const data = await res.json();
      setCountries(data);
    
  }

  async function filterByRegion(region) {
      const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      const data = await res.json();
      setCountries(data);
  }

  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry();
  }

  function handleFilterByRegion(e) {
    e.preventDefault();
    filterByRegion();
  }

  return (
    <>
        <section>
          <div className={styles.header}>
            <form onSubmit={handleSearchCountry} autoComplete="off">
              <input
                className={styles.search}
                type="text"
                name="search"
                id="search"
                placeholder="Search for a country by its name"
                required
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}/>
            </form>

            <form onSubmit={handleFilterByRegion}>
              <select
                className={styles.region}
                name="filter-by-region"
                id="filter-by-region"
                value={regions.name}
                onChange={(e) => filterByRegion(e.target.value)}
              >
                {regions.map((region, index) => (
                  <option key={index} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </section>
        <Container>
            <Row>
                <Col xs={12} md={6}>
                    {countries.map((country) => (
                        <Article key={country.name.common} {...country} />
                     ))}
                </Col>
            </Row>
        </Container>
    </>
  );
}