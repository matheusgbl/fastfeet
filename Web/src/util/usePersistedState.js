import { useEffect, useState } from 'react';

export default function usePersistedState(key, initialState) {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  },[key, state]);

  return [state, setState];
}
