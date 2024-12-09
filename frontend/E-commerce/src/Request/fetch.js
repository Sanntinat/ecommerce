import { useState, useEffect, useCallback } from "react";
import debounce from '@mui/material/utils/debounce';

export const token = localStorage.getItem('token');

const apiUrl = import.meta.env.VITE_BASE_URL;
const _fetchWithHeaders = async (url) => {
  const token = localStorage.getItem("token");
  const headers = token
    ? { Authorization: "Token " + token }
    : {};

  const response = await fetch(apiUrl + url, { headers });

  if (response.status === 401) {
    localStorage.removeItem("token"); 
    window.location.replace("/login"); 
    return Promise.reject(new Error("Unauthorized")); 
  }

  return response;
};


export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const response = await _fetchWithHeaders(url);
        console.log(`fetching ${url}`);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setloading(false);
        setData(json);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data `);
        setloading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};

export const useFetchDataOnDemand = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await _fetchWithHeaders(url);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};



export function useFetchSearch(url, delay, getFunc = (x)=>x) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchData = useCallback(debounce(async (search) => { // eslint-disable-line
    try {
      setLoading(true);
      console.log(search);
      const response = await _fetchWithHeaders(url +'?search='+ search);
      const jsonData = await response.json();
      setData(getFunc(jsonData));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, delay), [url, delay]);
  return [data, loading, error, searchData];
}
