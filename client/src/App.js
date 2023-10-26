import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Header from './components/Header';
import {auth} from './redux/auth-reducer';
import Preloader from "./utils/preloader/preloader";

const Routers = React.lazy(() => import("./route/Routers"));

function App() {
  const dispatch = useDispatch();

  /*useEffect(() => {
      dispatch(auth());
  }, [])*/

  return (
    <div className='container'>
      <Suspense fallback={<Preloader/>}>
        <Header />
        <Routers/>
      </Suspense>
    </div>
  );
}

export default App;