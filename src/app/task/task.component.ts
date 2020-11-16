import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeleteTask, UpdateTask } from '../actions/task.actions';
import { Task } from '../models/task.model';
import { AppState } from '../reducers';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [
    trigger('checkuncheck', [
      state('check', style({
        color: '#BBBBBB',
        textDecoration: 'line-through'
      })),
      state('uncheck', style({
        color: '#000000',
        textDecoration: 'none'
      })),
      transition('check => uncheck', [
        animate('0.5s')
      ]),
      transition('uncheck => check', [
        animate('0.5s')
      ])
    ]),
  ]
})
export class TaskComponent implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef;
  isHover: boolean = false;
  @Input() task: Task;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log(this.input);
  }

  deleteTask(){
    this.store.dispatch(new DeleteTask(this.task))
  }
  
  check(check: boolean){
    let newTask: Task = {...this.task, done: check};
    setTimeout(()=>{
      this.store.dispatch(new UpdateTask(newTask));
    },500);
    
  }
  change(title: string){
    if(title.trim()){
      if(title !== this.task.title){
        let newTask: Task = {...this.task, title: title};
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
