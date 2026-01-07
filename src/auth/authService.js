import React from 'react'


export const login = (username) => {
  localStorage.setItem("user", username);
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("user");
};

export const getUser = () => {
  return localStorage.getItem("user");
};

