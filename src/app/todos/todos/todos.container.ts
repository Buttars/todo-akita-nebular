import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ID } from '@datorama/akita';

import { TodosService, TodosQuery, Todo } from '../state';
import { VISIBILITY_FILTER, initialFilters } from '../filter/filter.model';

@Component({
  template: `
    <app-filter (update)="changeFilter($event)" [filters]="filters" [active]="activeFilter$ | async"></app-filter>
    <app-todos [todos]="todos$ | async" (add)="add($event)" (remove)="remove($event)" (completed)="completed($event)"></app-todos>
  `,
  styles: [
    `
      app-filter {
        margin-bottom: 0.5rem;
      }
    `
  ]
})
export class TodosContainer implements OnInit {
  todos$;
  activeFilter$: Observable<VISIBILITY_FILTER>;
  filters = initialFilters;

  constructor(private todosService: TodosService, private todosQuery: TodosQuery) {
    this.todos$ = this.todosQuery.selectVisibleTodos$;
    this.activeFilter$ = this.todosQuery.selectVisibilityFilter$;
  }

  ngOnInit() {}

  add = (title: string) => this.todosService.add(title);
  remove = (id: ID) => this.todosService.remove(id);
  completed = (todo: Todo) => this.todosService.completed(todo);

  changeFilter = (filter: VISIBILITY_FILTER) => {
    this.todosService.updateFilter(filter);
  };
}
