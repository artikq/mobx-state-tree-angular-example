import { Component, Inject } from '@angular/core';
import { ITodo, ITodoStore, TodoStore, SHOW_ALL } from './stores/todos.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  todoStore : ITodoStore;

  constructor() {
    this.todoStore = TodoStore.create({ todos:[], filter:SHOW_ALL });
  }

  addTodo(){
    this.todoStore.addTodo(this.title);
    this.title = '';    
  }

  trackTodoById(index:number, todo: ITodo){
    return todo.id;
  }
}