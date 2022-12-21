import { useAppDispatch } from "../store/hooks";
import { useHistory } from "react-router-dom";
import React, { Fragment, useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import { ReactNode } from "react";
import classes from "./LoginForm.module.css";
import userSlice, {loginUser} from "../store/user-slice";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const LoginForm = (props: any) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['jwttoken']);

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  // https://stackoverflow.com/questions/58675993/typescript-react-select-onchange-handler-type-error
  const updateHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(loginUser(userDetails)).then((result) => {
      const jwttoken = result.payload as string;
      removeCookie('jwttoken');

      // Store in react cookie
      setCookie("jwttoken", jwttoken);
    });

    history.push('/');
  };

  return (
    <Fragment>
      <div className={classes.form}>
        <FormControl>
          <InputLabel htmlFor="my-input">Username</InputLabel>
          <Input
            name="username"
            aria-describedby="my-helper-text"
            onChange={updateHandler}
            value={userDetails.username}
          />
          <FormHelperText id="my-helper-text">Input username.</FormHelperText>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="my-input">Password</InputLabel>
          <Input
            name="password"
            aria-describedby="my-helper-text"
            onChange={updateHandler}
            type="password"
          />
          <FormHelperText id="my-helper-text">Input username.</FormHelperText>
        </FormControl>

        <Button variant="contained" onClick={submitFormHandler}>
          Login
        </Button>

        <Typography align='center'>No account? Create account <Link to='/register'>here</Link>!</Typography>
      </div>
    </Fragment>
  );
};

export default LoginForm;
