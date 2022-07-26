import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  
  const inputRef = useRef(null);

  useEffect(()=>{
      inputRef.current.focus();
  },[input])

  const handleInputChange = (e) =>{
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 1000000),
      text: input
    });
    setInput('');
  };


  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
      <><input
        className="todo-input"
        type="text"
        placeholder="Update todo"
        name="text"
        value={input}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <button className="todo-button">Update Todo</button>
      </>
      ) : 
      (
      <><input
        className="todo-input"
        type="text"
        placeholder="Add a todo"
        name="text"
        value={input}
        onChange={handleInputChange}
        ref={inputRef}
      />
      <button className="todo-button">Add Todo</button>
      </>
      )}
    </form>
    
  );
}

export default TodoForm;
