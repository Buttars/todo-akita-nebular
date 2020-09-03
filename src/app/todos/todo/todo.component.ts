import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { filter } from 'rxjs/operators';

import { ID } from '@datorama/akita';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { Todo } from '../state';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit, OnDestroy {
  @Input() todo: Todo;
  @Output() completed = new EventEmitter<Todo>();
  @Output() remove = new EventEmitter<ID>();
  @Output() changed = new EventEmitter<{ id: ID; title: string }>();

  checkboxControl: FormControl;
  inputControl: FormControl;
  editing = false;

  options = [
    {
      title: 'Edit',
      icon: 'edit-outline',
      data: {
        action: () => {
          this.editing = true;
          this.cd.detectChanges();
        },
      },
    },
    {
      title: 'Remove',
      icon: 'trash-outline',
      data: {
        action: () => {
          this.remove.emit(this.todo.id);
        },
      },
    },
  ];

  constructor(
    private nbMenuService: NbMenuService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.checkboxControl = new FormControl(this.todo.completed);
    this.inputControl = new FormControl(this.todo.title);

    this.checkboxControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((completed: boolean) => {
        this.completed.emit({ ...this.todo, completed });
      });

    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === `todo-options-${this.todo.id.toString()}`)
      )
      .subscribe((option) => {
        const action = option.item.data?.action;
        if (!action) {
          return;
        }

        option.item.data.action();
      });
  }

  ngOnDestroy() {}

  completeEditing = () => {
    this.changed.emit({ id: this.todo.id, title: this.inputControl.value });
    this.editing = false;
  };
}
