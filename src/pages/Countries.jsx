import { useRef, useState } from "react";
import { useEffect } from "react";

function Countries() {
  const url = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  const selectRef = useRef(null);
  // get all countries

  useEffect(() => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setAllCountries(data);
          setCountries(data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  function filterCountries() {
    if (selectRef.current.value == "All") {
      setCountries(allCountries);
    } else {
      const filterCountry = allCountries.filter((country) => {
        return country.region == selectRef.current.value;
      });
      setCountries(filterCountry);
    }
  }

  // mapping on countries

  const showCountries = countries.map((country, index) => {
    return (
      <div key={index} className="card">
        <div className="card-img">
          <img src={country.flags.png} alt="" />
        </div>
        <div className="info">
          <h3>{country.name.common}</h3>
          <p>
            Population: <span>{country.population}</span>
          </p>
          <p>
            Region: <span>{country.region}</span>
          </p>
          <p>
            Capital: <span>{country.capital}</span>
          </p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="top-bar">
        <div className="container flex">
          <div className="search">
            <input type="text" placeholder="Search for a country..." />
            <span className="icon-search" />
          </div>

          <div className="filter">
            <select ref={selectRef} onChange={filterCountries}>
              <option value="" disabled>
                Filter by Region
              </option>
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="container cards flex">{showCountries}</div>
      </div>
    </>
  );
}
export default Countries;
