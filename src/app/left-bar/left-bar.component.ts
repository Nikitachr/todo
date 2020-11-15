import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddList } from '../actions/list.actions';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';
import { AppState, ListsState, selectLists } from '../reducers';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css']
})
export class LeftBarComponent implements OnInit {
  @ViewChild('form', { static: false }) input: ElementRef;

  lists: List[];
  id: number = 0;
  isAddList: boolean = false;
  lists$: Observable<List[]>;
  constructor(private store: Store<AppState>) { }


  ngOnInit() {
    this.lists$ = this.store.select(selectLists);
    this.lists$.subscribe(res => {
      if(res){
        this.lists = res;
        console.log(this.lists);
      }
    })
  }

  addList(title: string){
    if(title.trim())
    {
      let newList: List = {
        title: title,
        color: '#DC4C3F',
        id: this.id
      }
      this.store.dispatch(new AddList(newList))
    }
    this.id++;
    this.isAddList = false;
  }
  showInput(){ 
    this.isAddList = !this.isAddList;
    if(this.isAddList){
      setTimeout(()=>{
        this.input.nativeElement.focus();
      },0);
    } 
    
  }

}
