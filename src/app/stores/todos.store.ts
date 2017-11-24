import { types, getRoot, destroy, IModelType } from "mobx-state-tree";
import {TimeTraveller} from "mst-middlewares";

export type __IModelType = IModelType<any,any>;
import { boolean } from "mobx-state-tree/dist/types/primitives";
import { Injectable } from '@angular/core';

export const SHOW_ALL = "show_all"
export const SHOW_COMPLETED = "show_completed"
export const SHOW_ACTIVE = "show_active"

const filterType = types.union(...[SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE].map(types.literal));

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed
};

const Todo = types
    .model({
        text: types.string,
        completed: false,
        id: types.identifier(types.number)
    })
    .actions(self => ({
        remove() {
            getRoot(self).removeTodo(self);
        },
        edit(text: string) {
            self.text = text;
        },
        complete() {
            self.completed = !self.completed;
        }
    }));

export type ITodo = typeof Todo.Type;

export const TodoStore = types
    .model({
        todos: types.array(Todo),
        filter: types.optional(filterType, SHOW_ALL),
        history: types.optional(TimeTraveller, { targetPath: "../todos" })        
    })
    .views(self => ({
        get completedCount() {
            return self.todos.reduce((count, todo) => (todo.completed ? count + 1 : count), 0);
        },
        get activeCount() {
            return self.todos.filter(TODO_FILTERS[self.filter])
        },
        get filteredTodos() {
            return self.filter !== SHOW_ALL ?
              self.todos.filter(TODO_FILTERS[self.filter]) :
              this.todos;
        }
    }))
    .actions(self => ({
        addTodo(text: string) {
            const id: number = self.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;
            let completed: boolean = false;
            self.todos.push(<ITodo>{
                id,
                completed,
                text
            });
        },
        removeTodo(todo : ITodo) {
            self.todos.remove(todo);
        },
        showAll(){
            self.filter = SHOW_ALL;
        },
        showActive() {
            self.filter = SHOW_ACTIVE;
        },
        showCompleted(){
            self.filter = SHOW_COMPLETED;
        }
    }));
type TodoStoreType = typeof TodoStore.Type;

export interface ITodoStore extends TodoStoreType {};