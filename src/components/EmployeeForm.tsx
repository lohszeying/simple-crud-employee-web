import React, { Fragment, useRef } from "react";
import { RefactorActionInfo } from "typescript";
import classes from "./EmployeeForm.module.css";

const EmployeeForm = (props: any) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();

  const  submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // const enteredAuthor = authorInputRef.current.value;
    // const enteredText = textInputRef.current.value;

    // optional: Could validate here

    // props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const finishEnteringHandler = () => {
    // setIsEntering(true);
  };

  return (
    <Fragment>
      <form
        className={classes.form}
        onSubmit={submitFormHandler}
      >
        <div className={classes.control}>
          <label htmlFor="author">Author</label>
          <input type="text" id="author"  />
        </div>
        <div className={classes.control}>
          <label htmlFor="text">Text</label>
          <textarea id="text" ></textarea>
        </div>
        <div className={classes.actions}>
          <button onClick={finishEnteringHandler} className="btn">
            Add Quote
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default EmployeeForm;
