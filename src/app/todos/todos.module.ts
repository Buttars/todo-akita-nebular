import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NbButtonModule, NbListModule, NbInputModule, NbCheckboxModule, NbCardModule, NbIconModule, NbSelectModule } from '@nebular/theme';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos/todos.component';
import { TodosContainer } from './todos/todos.container';
import { TodoComponent } from './todo/todo.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [TodosComponent, TodosContainer, TodoComponent, FilterComponent],
  imports: [CommonModule, TodosRoutingModule, ReactiveFormsModule, NbButtonModule, NbListModule, NbInputModule, NbCheckboxModule, NbIconModule, NbCardModule, NbSelectModule]
})
export class TodosModule {}
