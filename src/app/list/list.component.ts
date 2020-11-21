import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeleteList, DeleteSelectedList, SelectList, UpdateList } from '../actions/list.actions';
import { List } from '../models/list.model';
import { AppState, selectedList } from '../reducers';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: List;
  isHover: boolean = false;
  selectedList$: Observable<List>;
  selectedList: List;
  colors: string[] = ['#DC4C3F', '#FED601', '#55A630', '#00A8E8', '#F20089'];
  constructor(private store: Store<AppState>, private taskService: TaskService) { }

  ngOnInit() {
    this.selectedList$ = this.store.select(selectedList);
    this.selectedList$.subscribe(res => {
      this.selectedList = res;
    });
  }

  changeColor(){
    let index: number = this.colors.findIndex((element) => element == this.list.color);
    console.log(index);
    let newIndex: number = ++index;
    if(newIndex === this.colors.length) { newIndex = 0;}
    let newList: List = {
      ...this.list,
      color: this.colors[newIndex],
    };
    this.store.dispatch(new UpdateList(newList));
    this.taskService.updateList(newList).subscribe()
  }

  selectList(){
    this.store.dispatch(new SelectList(this.list));
  }

  deleteList(){
    this.taskService.deleteList(this.list._id).subscribe((res: List) => {
      console.log(res);
      if(this.list === this.selectedList){
        this.store.dispatch(new DeleteSelectedList(this.list))
      } else {
        this.store.dispatch(new DeleteList(this.list))
      }
    })
  }
}
