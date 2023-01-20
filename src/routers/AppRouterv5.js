import React, { useEffect, useState } from 'react'

import {firebase} from '../firebase/firebase-config';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { JournalScreen } from '../components/yournal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { Styls } from '../styles/components/Styls';

export const AppRouter = () => {
  const [cheking, setCheking] = useState(true)
  const [isLoggetIn,setIsloggetIn] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user?.uid )
      {
      dispatch(login(user.uid,user.displayName))
      setIsloggetIn(true)
      }
      else{
        setIsloggetIn(false)
      }
      setCheking(false);
    })
  }, [ dispatch,setCheking,setIsloggetIn ])

  if (cheking ){
    return(
      <>
      <Styls/>
      <h1 className='loader'>Cargando</h1>
      </>
    )
  }
  
  return (
    <Router>
        <div>
            <Switch>
            <Route path="/auth" component={AuthRouter}/>
            <Route exact path="/" component={JournalScreen}/>
            <Redirect to="/auth/login"/>
            </Switch>
        </div>
    </Router>
  )
}
