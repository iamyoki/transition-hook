import {useState} from 'react';

export function useTransition() {
  const [num, setNum] = useState(0);

  return [num, setNum];
}
