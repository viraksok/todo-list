import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import TodoActionHandlers from './todoactionhandlers';

export default function Home() {
  const [todo, setTodo] = useState('');
  const [todolist, setTodolist] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditIndex, setIsEditIndex] = useState(0);
  const [filteredTodo, setFilteredTodo] = useState([]);
  const [isLoad, setIsload] = useState(true);
  const [getData, setGetData] = useState([]);

  /*function load data*/
  const fetchData = () => {
    fetch('/api/todo')
      .then((response) => response.json())
      .then((data) => setTodolist(data));
    if (isLoad) {
      console.log(getData);
      setIsload(false);
      return setFilteredTodo(getData);
    } else {
      setIsload(true);
      return [];
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  /*on key enter click*/
  const addToList = (event) => {
    /*If key press enter*/
    if (event.key == 'Enter') {
      /*Validate input if it's empty*/
      if (todo !== '') {
        if (!isEdit) {
          if (
            !todolist.some((el) => el.todo.toLowerCase() == todo.toLowerCase())
          ) {
            todolist.push({
              id: todolist.length,
              todo: todo,
              isCompleted: false,
              createAt: Date(),
            });
            setTodolist(todolist);
            setTodo('');
            const requestPost = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(todolist),
            };
            fetch('/api/todo', requestPost)
              .then((response) => response.json())
              .then((data) => setTodolist(data));
          } else {
            alert('This input value alreay exist!');
          }
        } else {
          setIsEdit(false);
          todolist[isEditIndex].todo = todo;
          setTodo('');

          const requestPut = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todolist),
          };
          fetch('/api/todo', requestPut)
            .then((response) => response.json())
            .then((data) => setTodolist(data));
        }
      } else {
        alert('Please insert some text!');
      }
    }
  };

  /*on button edit click*/
  const onClickEdit = (el) => {
    setIsEdit(true);
    setTodo(el.todo);
    var editIndex = todolist.findIndex((elment) => elment.id === el.id);
    setIsEditIndex(editIndex);
  };

  /*on button remove click*/
  const onClickRemove = (el) => {
    let removelist = todolist.filter((r) => r.id != el.id);
    setTodolist([...removelist]);
    const requestDelete = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: el.id,
    };
    fetch('/api/todo', requestDelete)
      .then((response) => response.json())
      .then((data) => setTodolist(data));
  };

  /*on button complete click*/
  const onClickComplete = (el) => {
    let strikelist = todolist.map((taskTodolist) => {
      return el.isCompleted
        ? taskTodolist.id == el.id
          ? { ...taskTodolist, isCompleted: false }
          : { ...taskTodolist }
        : taskTodolist.id == el.id
        ? { ...taskTodolist, isCompleted: true }
        : { ...taskTodolist };
    });
    setTodolist([...strikelist]);
    const requestStrike = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(strikelist),
    };
    fetch('/api/todo', requestStrike)
      .then((response) => response.json())
      .then((data) => setTodolist(data));
  };

  useEffect(() => {
    setFilteredTodo(
      todolist.filter((el) =>
        el.todo.toLowerCase().includes(todo.toLowerCase())
      )
    );
  }, [todo, todolist]);
  return (
    <div>
      <h1 className={styles.container_magin}>TODO LIST</h1>
      <input
        className={styles.input_padding}
        placeholder="please input some text."
        onKeyDown={addToList}
        value={todo}
        onChange={(even) => setTodo(even.target.value)}
      />
      {filteredTodo.map((item) => (
        <TodoActionHandlers
          item={item}
          onComplete={onClickComplete}
          onEdit={onClickEdit}
          onRemove={onClickRemove}
        />
      ))}
      <p
        className={styles.container_magin}
        hidden={!(todolist.length !== 0 && filteredTodo.length === 0)}
      >
        No result. Create a new one instead!
      </p>
      <br />
    </div>
  );
}
