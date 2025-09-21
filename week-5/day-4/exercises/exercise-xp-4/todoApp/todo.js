class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  markAsCompleted(index) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index].completed = true;
    }
  }

  getTodos() {
    return this.todos;
  }
}

export default TodoList;
