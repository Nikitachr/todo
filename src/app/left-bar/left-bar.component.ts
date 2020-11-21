import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddList, DeleteSelectedList, LoadLists } from '../actions/list.actions';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';
import { AppState, ListsState, selectLists } from '../reducers';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';
import { WebRequestService } from '../services/web-request.service';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css'],
  animations: [
    trigger(
      'listAnim', 
      [
        transition(
          ':leave', 
          [
            style({ marginTop: '0px', opacity: 1 }),
            animate('0.2s ease-in-out', 
                    style({ marginTop: '-45px', opacity: 0 }))
          ], 
        )
      ]
    ),
    trigger('openClose', [
      state('open', style({

        transform: 'rotate(45deg)'
      })),
      state('closed', style({
        transform: 'rotate(0)'
      })),
      transition('open => closed', [
        animate('0.5s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.5s ease-in-out')
      ]),
    ]),
    trigger(
      'input', 
      [
        transition(
          ':enter', 
          [
            style({ width: '0%', opacity: 0 }),
            animate('0.3s ease', 
                    style({width: '100%', opacity: 1 }))
          ], 
        )
        
      ]
    )
  ]
})
export class LeftBarComponent implements OnInit {
  
  @ViewChild('form', { static: false }) input: ElementRef;
  isDisabled: boolean;
  lists: List[] = [];
  id: number = 0;
  isAddList: boolean = false;
  lists$: Observable<List[]>;
  constructor(private store: Store<AppState>, private taskService: TaskService) { }


  ngOnInit() {
    this.taskService.getLists().subscribe((res: List[]) => {
      this.store.dispatch(new LoadLists(res));
    })
    this.lists$ = this.store.select(selectLists);
    this.lists$.subscribe(res => {
      if(res){
        if(this.lists.length === res.length){
          this.isDisabled = true;
        } else {
          this.isDisabled = false;
        }
        setTimeout(()=>{
          this.lists = res;
        },0);
      }
    })
  }

  addList(title: string){
    if(title.trim())
    {
      
      this.taskService.createList(title).subscribe((res: List) => {
        console.log(res);
        let newList: List = {
          color: '#DC4C3F',
          _id: res._id,
          title: title,
          _userId: res._userId
        }
        this.store.dispatch(new AddList(newList))
      })
      
    }
    
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
