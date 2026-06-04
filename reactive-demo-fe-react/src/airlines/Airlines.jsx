import { useEffect, useState } from 'react';
import AirlinesList from './AirlinesList';
import { getCountryList } from './airlinesService';

const DEFAULT_COUNTRY = 'Netherlands';

function Airlines() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  useEffect(() => {
    getCountryList()
      .then((list) => setCountries(list))
      .catch(() => setCountries([]));
  }, []);

  return (
    <div className="airlines">
      <label className="country-select">
        Country
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <AirlinesList country={country} />
    </div>
  );
}

export default Airlines;
