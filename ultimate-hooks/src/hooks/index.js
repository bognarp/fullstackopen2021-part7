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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const create = (resource) => {
    const newResource = {
      ...resource,
      id: Math.floor(Math.random() * 100000),
    };

    axios.post(baseUrl, newResource).then((response) => {
      setResources(resources.concat(response.data));
    });
  };

  const service = {
    create,
  };

  return [resources, service];
};
