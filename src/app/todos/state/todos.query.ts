import { Injectable } from '@angular/core';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { QueryEntity } from '@datorama/akita';

import { Todo } from '.';
import { TodosStore, TodosState } from './todos.store';
import { VISIBILITY_FILTER } from '../filter/filter.model';

@Injectable({ providedIn: 'root' })
export class TodosQuery extends QueryEntity<TodosState> {
  todos$ = this.selectAll();
  selectVisibilityFilter$ = this.select((state) => state.ui.filter);
  selectVisibleTodos$ = combineLatest([
    this.selectVisibilityFilter$,
    this.selectAll(),
  ]).pipe(map((results) => this.getVisibleTodos(results[0], results[1])));

  constructor(protected store: TodosStore) {
    super(store);

    const todos = JSON.parse(localStorage.getItem('todos'));
    store.set(todos || []);
    this.todos$.subscribe((t) =>
      localStorage.setItem('todos', JSON.stringify(t))
    );
  }

  private getVisibleTodos(filter, todos): Todo[] {
    switch (filter) {
      case VISIBILITY_FILTER.SHOW_COMPLETED:
        return todos.filter((t) => t.completed);
      case VISIBILITY_FILTER.SHOW_ACTIVE:
        return todos.filter((t) => !t.completed);
      default:
        return todos;
    }
  }
}
