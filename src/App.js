import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

// function App() {
//   return (
//     <div>
//       <h1>Hello React! :D</h1>
//     </div>
//   );
// }

// const App = () => {
//   // use state returns an array: variable, function
//   const [name, setName] = useState('Joey');

//   // not necessary, but helps with caching so as to not continue
//   // to rerender
//   const onNameChange = useCallback((event) => {
//     console.log(event.target.value);
//     setName(event.target.value);
//   }, [])
//   return (
//     <div>
//       <label htmlFor="">Enter Your Name: </label>
//       <input
//         value={name}
//         type="text"
//         onChange={onNameChange}
//       />
//       <h1>Hello {name}!</h1>
//     </div>
//   )
// }

const App = () => {
  const [newTodo, setNewTodo] = useState('');

  // todos is an array
  const [todos, setTodos] = useState([]);

  // reusable
  const onNewTodoChange = useCallback((event) => {
    setNewTodo(event.target.value);
  }, [])

  const formSubmitted = useCallback((event) => {
    event.preventDefault();
    if (!newTodo.trim()) return;

    setTodos([

      {
        id: todos.length ? todos[0].id + 1 : 1,
        content: newTodo,
        done: false,
      },
      ...todos,
    ])

    // clears the input form
    setNewTodo('');

  }, [newTodo, todos])

  // log is called at every single render
  // console.log('todos', todos);

  // this will only run when the dependency list changes
  // useeffect(hook) is used typically with api calls
  useEffect(() => {
    console.log('todos', todos);
  }, [todos])

  // closure
  const addTodo = useCallback((todo, index) => (event) => {

    const newTodos = [...todos];

    newTodos.splice(index, 1, {
      ...todo,
      done: !todo.done
    })

    setTodos(newTodos)
  }, [todos]);

  // closure
  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(otherTodo => otherTodo !== todo));
  }, [todos]);

  const markAllTodo = useCallback(() => {
    const updateTodos = todos.map(todo => {
      return {
        ...todo,
        done: true,
      };
    });
    setTodos(updateTodos);
  }, [todos])

  return (
    <div>
      <form action="" onSubmit={formSubmitted} >
        <label htmlFor="newTodo">Enter a Todo:</label>
        <input
          id='newTodo'
          type="text"
          name='newTodo'
          value={newTodo}
          onChange={onNewTodoChange}
        />
        <button>Add Todo</button>
      </form>
      <button onClick={markAllTodo} >Mark All Done</button>
      <ul>
        {todos.map((todo, index) =>
          // key is mostly used for the React Updating algorithm
          <li key={todo.id}  >
            <input
              checked={todo.done}
              type="checkbox"
              onChange={addTodo(todo, index)}
            />
            <span className={todo.done ? 'done' : ''}>
              {todo.content}
            </span>
            <button onClick={removeTodo(todo)} >Remove Todo</button>

          </li>
        )}
      </ul>
    </div>
  )
}

export default App;
