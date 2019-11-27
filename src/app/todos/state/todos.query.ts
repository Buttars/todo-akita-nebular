import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TodosStore, TodosState } from './todos.store';

@Injectable({ providedIn: 'root' })
export class TodosQuery extends QueryEntity<TodosState> {
  todos$ = this.selectAll();

  constructor(protected store: TodosStore) {
    super(store);
    const todos = JSON.parse(localStorage.getItem('todos'));
    store.set(todos || []);
    this.todos$.subscribe(t => localStorage.setItem('todos', JSON.stringify(t)));
  }
}
