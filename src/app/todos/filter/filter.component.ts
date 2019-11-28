import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

import { untilDestroyed } from 'ngx-take-until-destroy';

import { VISIBILITY_FILTER, TodoFilter } from './filter.model';

enum ComponentStatusEnum {
  'DEFAULT' = '',
  'PRIMARY' = 'primary',
  'SUCCESS' = 'success',
  'WARNING' = 'warning',
  'DANGER' = 'danger',
  'INFO' = 'info',
  'CONTROL' = 'control'
}

const filterColorMap = {
  [VISIBILITY_FILTER.SHOW_ALL]: '',
  [VISIBILITY_FILTER.SHOW_ACTIVE]: ComponentStatusEnum.WARNING,
  [VISIBILITY_FILTER.SHOW_COMPLETED]: ComponentStatusEnum.PRIMARY
};

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() active: VISIBILITY_FILTER;
  @Input() filters: TodoFilter[];
  @Output() update = new EventEmitter<VISIBILITY_FILTER>();

  filterStatus$: BehaviorSubject<any> = new BehaviorSubject(ComponentStatusEnum.DEFAULT);

  control: FormControl;

  constructor() {}

  ngOnInit() {
    this.control = new FormControl(this.active);

    this.filterStatus$.next(filterColorMap[this.active]);

    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(c => {
      this.filterStatus$.next(filterColorMap[c]);
      this.update.emit(c);
    });
  }

  ngOnDestroy(): void {}
}
