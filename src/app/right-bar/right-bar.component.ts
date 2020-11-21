import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DeleteSelectedList, UpdateList, UpdateSelectedList } from '../actions/list.actions';
import { AddTask } from '../actions/task.actions';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';
import { AppState, selectedList, selectTasks } from '../reducers';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.css'],
  animations: [
    trigger(
      'taskAnim', 
      [
        transition(
          ':leave', 
          [
            style({ marginTop: '0px', opacity: 1 }),
            animate('0.3s ease-in-out', keyframes([
              style({ marginTop: '-35px', opacity: 0, offset: 0.7 }),
              style({ marginTop: '-55px', opacity: 0, offset: 1 })
            ]))       
          ]
        )
      ]
    )  
  ]
})
export class RightBarComponent implements OnInit {
  @ViewChild('title', { static: false }) titleInput: ElementRef;
  @ViewChild('input', { static: false }) input: ElementRef;
  isDisabled: boolean;
  isHover: boolean = false;
  selectedList$: Observable<List>;
  selectedList: List;
  
  tasks$: Observable<Task[]>;
  tasks: Task[] = [];
  isAddTask: boolean = false;
  constructor(private store: Store<AppState>, private taskService: TaskService) { }

  ngOnInit() {
    this.selectedList$ = this.store.select(selectedList);
    this.selectedList$.subscribe(res => {
      this.selectedList = res;
    });
    this.tasks$ = this.store.select(selectTasks);
    this.tasks$.subscribe(res => {
      console.log(res);
      if(res){
        if(this.tasks.length === res.length){
          this.isDisabled = true;
        } else {
          this.isDisabled = false;
        }
        setTimeout(()=>{
          this.tasks = res;
        },0);
      }
    });
  }
  addTask(title: string){
    if(title.trim()){
      this.taskService.createTask(title, this.selectedList._id).subscribe((task: Task) => {
        this.store.dispatch(new AddTask(task));
      });
    }
    this.isAddTask = false;
  }
  showInput(){
    this.isAddTask = true;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.input.nativeElement.focus();
    },0);
  }
  change(title: string){
    if(title.trim()){
      if(title !== this.selectedList.title){
        let newList: List = {...this.selectedList, title: title};
        this.taskService.updateList(newList).subscribe();
        this.store.dispatch(new UpdateList(newList));
        this.store.dispatch(new UpdateSelectedList(newList));
      }
    }
    else {
      this.titleInput.nativeElement.innerText = this.selectedList.title;
    }
  }
  enter(){
    this.titleInput.nativeElement.blur();
  }
  deleteList(){
    this.taskService.deleteList(this.selectedList._id).subscribe();
    this.store.dispatch(new DeleteSelectedList(this.selectedList));
  }
}
