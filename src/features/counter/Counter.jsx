import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset, incrementByAmount } from './counterSlice';
import { useState } from 'react';

export const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [number, setNumber] = useState(0);

  const handleChange = (e) => {
    setNumber(+e.target.value);
  };
  const handleReset = () => {
    setNumber(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>{count}</p>
      <input type='number' value={number} onChange={handleChange} />
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={() => dispatch(incrementByAmount(number))}>incrementByAmount</button>
      </div>
    </section>
  );
};
