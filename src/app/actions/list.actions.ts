import { Action } from '@ngrx/store';
import { List } from '../models/list.model';
import { DeleteTask } from './task.actions';

export enum ListActionTypes {
  LoadLists = '[List] Load Lists',
  DeleteList = '[List] Delete Lists',
  AddList = '[List] Add List' ,
  UpdateList = '[List] Update List',
  SelectList = '[List] Select List',
  UpdateSelectedList = '[List] Update Selected List',
  DeleteSelectedList = '[List] Delete Selected List'
}

export class ListsAction implements Action {
  type: string;
  payload: List;
}

export class LoadLists implements Action {
  readonly type = ListActionTypes.LoadLists;
}

export class AddList implements Action {
  readonly type = ListActionTypes.AddList;
  constructor(readonly payload: List) {
  }
}
export class UpdateList implements Action {
  readonly type = ListActionTypes.UpdateList;
  constructor(readonly payload: List) {
  }
}

export class SelectList implements Action {
  readonly type = ListActionTypes.SelectList;
  constructor(readonly payload: List) {
  }
}

export class UpdateSelectedList implements Action {
  readonly type = ListActionTypes.UpdateSelectedList;
  constructor(readonly payload: List) {
  }
}

export class DeleteList implements Action {
  readonly type = ListActionTypes.DeleteList;
  constructor(readonly payload: List) {
  }
}

export class DeleteSelectedList implements Action {
  readonly type = ListActionTypes.DeleteSelectedList;
  constructor(readonly payload: List) {
  }
}

export type ListActions = LoadLists | AddList | UpdateList | SelectList | UpdateSelectedList | DeleteList | DeleteSelectedList;
