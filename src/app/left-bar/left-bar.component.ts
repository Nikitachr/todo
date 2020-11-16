import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddList, DeleteSelectedList } from '../actions/list.actions';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';
import { AppState, ListsState, selectLists } from '../reducers';

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
  constructor(private store: Store<AppState>) { }


  ngOnInit() {
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
