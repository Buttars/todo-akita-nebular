import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NbButtonModule, NbListModule, NbInputModule, NbCheckboxModule, NbCardModule, NbIconModule } from '@nebular/theme';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos/todos.component';
import { TodosContainer } from './todos/todos.container';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [TodosComponent, TodosContainer, TodoComponent],
  imports: [CommonModule, TodosRoutingModule, ReactiveFormsModule, NbButtonModule, NbListModule, NbInputModule, NbCheckboxModule, NbIconModule, NbCardModule]
})
export class TodosModule {}
