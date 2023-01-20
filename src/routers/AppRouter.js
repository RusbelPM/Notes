import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";
import { login } from "../actions/auth";
import { JournalScreen } from "../components/yournal/JournalScreen";
import { Styls } from "../styles/components/Styls";
import {  startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const [cheking, setCheking] = useState(true);
  const [isLoggetIn, setIsloggetIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged( async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsloggetIn(true);
       
       dispatch(startLoadingNotes(user.uid))
      } else {
        setIsloggetIn(false);
      }
      setCheking(false);
    });
  }, [dispatch, setCheking, setIsloggetIn]);

  if (cheking) {
    return (
      <>
        <Styls />
        <h1 className="loader">Cargando</h1>
      </>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginScreen />} /> */}
        <Route
          path="/auth/*"
          element={
            <PublicRoute isLoggetIn={isLoggetIn}>
              <AuthRouter />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute isLoggetIn={isLoggetIn}>
              <JournalScreen />
            </PrivateRoute>
          }
        />
        {/* <Route path="/*" element={<DashBoardRouter/>} /> */}
      </Routes>
    </BrowserRouter>
  );
};
