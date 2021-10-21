import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name.trim().length > 0) {
      axios
        .get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        )
        .then((res) => {
          const apiResponse = res.data[0];
          setCountry({
            found: true,
            data: {
              name: apiResponse.name.common,
              capital: apiResponse.capital[0],
              population: apiResponse.population,
              flag: apiResponse.flags.svg,
            },
          });
        })
        .catch((err) => {
          setCountry({
            found: false,
            data: null,
          });
        });
    }
  }, [name]);

  return country;
};
