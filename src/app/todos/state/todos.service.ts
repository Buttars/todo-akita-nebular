import { Injectable } from '@angular/core';

import { ID } from '@datorama/akita';

import { TodosStore } from './todos.store';
import { createTodo, Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodosService {
  constructor(private todosStore: TodosStore) {}

  add = (title: string) => {
    this.todosStore.add(createTodo(title));
  };

  remove = (id: ID) => {
    this.todosStore.remove(id);
  };

  completed = ({ id, completed }: Todo) => {
    this.todosStore.update(id, { completed });
  };
}
