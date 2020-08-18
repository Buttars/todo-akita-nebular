import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Todo } from '../state';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  @Input() todos: Array<Todo>;
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() completed = new EventEmitter();

  title = new FormControl();
  showData = new FormControl();

  constructor() {}

  ngOnInit() {}

  addTodo = () => {
    this.add.emit(this.title.value);
    this.title.reset();
  };
}
