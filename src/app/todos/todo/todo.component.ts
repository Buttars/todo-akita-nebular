import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ID } from '@datorama/akita';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { Todo } from '../state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit, OnDestroy {
  @Input() todo: Todo;
  @Output() completed = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<ID>();

  control: FormControl;

  constructor() {}

  ngOnInit() {
    this.control = new FormControl(this.todo.completed);

    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe((completed: boolean) => {
      this.completed.emit({ ...this.todo, completed });
    });
  }

  ngOnDestroy() {}
}
