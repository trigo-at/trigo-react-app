// export const getAuthToken = () => localStorage.getItem('id_token');
export const getAuthToken = () =>
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJnYW5kYWxmIiwiaWF0IjoxNDg3MDgwMTQ2LCJleHAiOjE1MTg2Mzc3NDZ9.J42qRn1U3gqlWRk2ew_HIsV9Fp3bxNnT-qUoGf6fcts';

export const setAuthToken = (token) => {
	localStorage.setItem('id_token', token);
};

export const removeAuthToken = () => {
	localStorage.removeItem('id_token');
};
