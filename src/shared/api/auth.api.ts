// import axios from 'axios';
// import apiInstance from './api.instance';

import apiInstance from './api.instance';

const authApi = {
  login: async (
    email: string,
    password: string,
  ): Promise<{
    token: string;
    type: 'Bearer';
  }> => {
    // const response = await apiInstance.post('/api/auth/login', { email, password });
    // return response.data;
    const response = await apiInstance.post('auth/login', { login: email, password });
    return response.data;
  },

  register: async (
    email: string,
    password: string,
    title: string,
  ): Promise<{
    token: string;
  }> => {
    let loginData = {};

    const name = title.split(' ')[0];
    const surname = title.split(' ')[1];
    loginData = {
      login: email,
      password,
      email,
      name,
      surname,
      userType: 'USER',
    };

    console.log('register', loginData);
    const response = await apiInstance.post('auth/signup', loginData);
    return response.data;
  },
};

export default authApi;
