import { Injectable } from '@angular/core';

import { ID } from '@datorama/akita';

import { TodosStore } from './todos.store';
import { createTodo, Todo } from './todo.model';
import { VISIBILITY_FILTER } from '../filter/filter.model';

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

  updateFilter = (filter: VISIBILITY_FILTER) => {
    this.todosStore.update({
      ui: {
        filter
      }
    });
  };
}
