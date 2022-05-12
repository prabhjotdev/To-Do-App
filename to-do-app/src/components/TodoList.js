import React, {useState, useEffect} from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

function TodoList() {

  const [todos, setTodos] = useState(()=>{
    const savedTodos = localStorage.getItem("Todos");
    const initialValue = JSON.parse(savedTodos);
    return initialValue || [];
  });

  useEffect(()=>{
    localStorage.setItem("Todos",JSON.stringify(todos));
  },[todos])

  const addTodo = (todo)=>{
      if(!todo.text || /^\s*$/.test(todo.test)){
          return;
      }

      const newTodos = [todo, ...todos];

      setTodos(newTodos);
      console.log(...todos);
  }

  const completeTodo = (id)=>{
    let updatedTodos = todos.map(todo => {
        if(todo.id === id) {
            todo.isComplete = !todo.isComplete;
        }
        return todo;
    });
    setTodos(updatedTodos);
  }
  
  const updateTodo = (todoId, newValue) =>{
    if(!newValue.text || /^\s*$/.test(newValue.test)){
        return;
    }

    setTodos(prev=> prev.map(item => (item.id === todoId ? newValue : item)));

  }

  const removeTodo = (id) =>{
    const removeArr = [...todos].filter(todo => todo.id !== id);
    setTodos(removeArr);
    
  }


  return (
    <div>
        <h1>What To Do Today?</h1>
        <TodoForm onSubmit={addTodo}/>
        <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
    </div>
  )
}

export default TodoList