import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { ListActionTypes, SelectList } from '../actions/list.actions';
import { LoadTasks } from '../actions/task.actions';
import { Task } from '../models/task.model';
import { AppState } from '../reducers';
import { TaskService } from '../services/task.service';



@Injectable()
export class ListEffects {

  @Effect()
  selectList$ = this.actions$
    .pipe(
      ofType<SelectList>(ListActionTypes.SelectList),
      mergeMap((action) => this.taskService.getTasks(action.payload._id)
      .pipe(
        map((tasks: Task[]) => {
          return (new LoadTasks(tasks));
        })
      ))
  );

  constructor(private actions$: Actions, private store: Store<AppState>, private taskService: TaskService) { }

  

}
