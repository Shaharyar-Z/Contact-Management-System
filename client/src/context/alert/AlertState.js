import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import alertContext from "./alertContext";
import { alertReducer } from "./alertReducer";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AuthState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  // Register User

  return (
    <alertContext.Provider
      value={{
        alerts : state,
        setAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AuthState;
