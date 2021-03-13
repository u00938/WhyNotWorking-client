import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { Description } from "../description/Description";
import { setCurrentPage } from "../sidebar/sidebarSlice";
import { gitHubSignUp } from "../signUp/signUpSlice";
import styles from "./Home.module.css";

export function Home() {
  let match = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    console.log(authorizationCode);
    if (authorizationCode) {
      console.log("signup auth code");
      dispatch(gitHubSignUp(authorizationCode));
      history.push("/signupDetail");
    }
    dispatch(setCurrentPage(match.path));
  }, [dispatch, match]);

  return (
    <div className={styles.container}>
      <div className={styles.title}></div>
      <div className={styles.head}>
        Questions are everywhere, answers are on Queue Overflow
      </div>
      <Description />
    </div>
  );
}
