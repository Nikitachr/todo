import { Action } from '@ngrx/store';
import { Task } from '../models/task.model';

export enum TaskActionTypes {
  LoadTasks = '[Task] Load Tasks',
  AddTask = '[Task] Add Task',
  DeleteTask = '[Task] Delete Task',
  UpdateTask = '[Task] Update Task'
}

export class TasksAction implements Action {
  type: string;
  payload: Task & Task[];
}

export class LoadTasks implements Action {
  readonly type = TaskActionTypes.LoadTasks;
  constructor(readonly payload: Task[]) {
  }
}

export class AddTask implements Action {
  readonly type = TaskActionTypes.AddTask;
  constructor(readonly payload: Task) {
  }
}

export class DeleteTask implements Action {
  readonly type = TaskActionTypes.DeleteTask;
  constructor(readonly payload: Task) {
  }
}

export class UpdateTask implements Action {
  readonly type = TaskActionTypes.UpdateTask;
  constructor(readonly payload: Task) {
  }
}


export type TaskActions = LoadTasks | AddTask | DeleteTask | UpdateTask;
