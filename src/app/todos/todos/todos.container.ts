import { Component, OnInit } from '@angular/core';
import { TodosService, TodosQuery, Todo } from '../state';
import { ID } from '@datorama/akita';

@Component({
  template: `
    <app-todos [todos]="todos$ | async" (add)="add($event)" (remove)="remove($event)" (completed)="completed($event)"></app-todos>
  `,
  styleUrls: []
})
export class TodosContainer implements OnInit {
  todos$;

  constructor(private todosService: TodosService, private todosQuery: TodosQuery) {
    this.todos$ = this.todosQuery.todos$;
  }

  ngOnInit() {}

  add = (title: string) => this.todosService.add(title);
  remove = (id: ID) => this.todosService.remove(id);
  completed = (todo: Todo) => this.todosService.completed(todo);
}
