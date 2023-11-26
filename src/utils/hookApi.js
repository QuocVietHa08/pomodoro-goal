// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react';

export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  if (typeof value == 'object' && Array.isArray(value) && !ref.current)
    return [];
  return ref.current;
};
