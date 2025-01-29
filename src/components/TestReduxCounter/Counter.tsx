'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { decrement, increment, setValue } from '../../../store/counter/counterSlice';


const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
  };

  const handleSetValue = () => {
    dispatch(setValue(inputValue));
  };

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={() => dispatch(increment())}>Incrementar</button>
      <button onClick={() => dispatch(decrement())}>Decrementar</button>
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSetValue}>Establecer valor</button>
      </div>
    </div>
  );
};

export default Counter;
