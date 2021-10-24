import axios from 'axios';

const signup = async (credentials) => {
  const response = await axios.post('/api/users', credentials);
  return response.data;
};

const signupService = { signup };

export default signupService;
