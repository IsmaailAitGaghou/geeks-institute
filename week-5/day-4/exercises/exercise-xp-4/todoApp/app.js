import {TodoList} from './todo.js';

const todoList = new TodoList();

todoList.addTodo({ text: 'Learn JavaScript', completed: false });
todoList.addTodo({ text: 'Build a Todo App', completed: false });
todoList.addTodo({ text: 'Learn React', completed: false });

console.log(todoList.getTodos());

todoList.markAsCompleted(0);

console.log(todoList.getTodos());
