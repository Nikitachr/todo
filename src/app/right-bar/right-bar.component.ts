import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeleteSelectedList, UpdateList, UpdateSelectedList } from '../actions/list.actions';
import { AddTask } from '../actions/task.actions';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';
import { AppState, selectedList, selectTasks } from '../reducers';

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.css']
})
export class RightBarComponent implements OnInit {
  @ViewChild('title', { static: false }) titleInput: ElementRef;
  @ViewChild('input', { static: false }) input: ElementRef;
  isHover: boolean = false;
  selectedList$: Observable<List>;
  selectedList: List;
  id: number = 0;
  tasks$: Observable<Task[]>;
  tasks: Task[] = [];
  isAddTask: boolean = false;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.selectedList$ = this.store.select(selectedList);
    this.selectedList$.subscribe(res => {
      this.selectedList = res;
    });
    this.tasks$ = this.store.select(selectTasks);
    this.tasks$.subscribe(res => {
      if(res){
        this.tasks = res;
      }
    });
  }
  addTask(title: string){
    if(title.trim()){
      this.store.dispatch(new AddTask({
        done: false,
        title: title,
        id: this.id,
        listId: this.selectedList.id
      }));
      this.id++;
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
    this.store.dispatch(new DeleteSelectedList(this.selectedList));
  }
}
