import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeleteTask, UpdateTask } from '../actions/task.actions';
import { Task } from '../models/task.model';
import { AppState } from '../reducers';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],

})
export class TaskComponent implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef;
  isHover: boolean = false;
  @Input() task: Task;
  constructor(private store: Store<AppState>, private taskService: TaskService) { 
    
  }

  ngOnInit() {
  }
  
  deleteTask(){
    this.taskService.deleteTask(this.task).subscribe()
    this.store.dispatch(new DeleteTask(this.task))
  }
  
  check(check: boolean){
    let newTask: Task = {...this.task, done: check};
    this.taskService.updateTask(newTask).subscribe(res => {
      this.store.dispatch(new UpdateTask(newTask)); 
    }, err => {
      this.store.dispatch(new UpdateTask(newTask));
    });
    
  }
  change(title: string){
    if(title.trim()){
      if(title !== this.task.title){
        let newTask: Task = {...this.task, title: title};
        this.taskService.updateTask(newTask).subscribe();
        this.store.dispatch(new UpdateTask(newTask));
      }
    }
    else {
      this.input.nativeElement.innerText = this.task.title;
    }
  }
  enter(){
    this.input.nativeElement.blur();
  }
}
