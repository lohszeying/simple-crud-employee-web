import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage';

import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { useAppDispatch } from './store/hooks';
import {FetchEmployeesData} from './store/employee-actions'

function App() {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FetchEmployeesData());
  },[dispatch]);

  return (
    <div>
      <Homepage />
    </div>
  );
}

export default App;
