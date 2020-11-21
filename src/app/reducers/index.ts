import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ListActionTypes, ListsAction } from '../actions/list.actions';
import { TaskActionTypes, TasksAction } from '../actions/task.actions';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';


export interface ListsState {
  Lists: List[];
  selectedList: List | null;
}

const initialListsState: ListsState = {
  Lists: [],
  selectedList: null
  
};

export interface TasksState {
  Tasks: Task[];
}

const initialTasksState: TasksState = {
  Tasks: []
};

export interface AppState {
  listState: ListsState;
  tasksState: TasksState;
}

export function ListsReducer(state: ListsState = initialListsState, action: ListsAction): ListsState {
  switch (action.type) {
    case ListActionTypes.LoadLists:
      return {
        ...state,
        Lists: action.payload as List[]
      };
    case ListActionTypes.AddList:
      return {
        ...state,
        Lists: [...state.Lists, action.payload as List]
      };
    case ListActionTypes.UpdateList:
      return {
        ...state,
        Lists: state.Lists.map(list => {
          let List: List = action.payload as List
          if (list._id == List._id){
            return action.payload;
          } else {
            return list;
          }
        }) as List[]
      }; 
      case ListActionTypes.SelectList:
        return{
          ...state,
          selectedList: action.payload as List
        }; 
      case ListActionTypes.UpdateSelectedList:
        return {
          ...state,
          selectedList: action.payload as List
        };
      case ListActionTypes.DeleteList:
        return {
          ...state,
          Lists: state.Lists.filter(list => {
            let List: List = action.payload as List
            if(list._id !== List._id) {
              return true;
            } else {
              return false;
            }
          }) as List[]
        }
      case ListActionTypes.DeleteSelectedList:
        return {
          Lists: state.Lists.filter(list => {
            let List: List = action.payload as List
            if(list._id !== List._id) {
              return true;
            } else {
              return false;
            }
          }) as List[],
          selectedList: null
        }  
    default:
      return state;
  }
}

export function TasksReducer(state: TasksState = initialTasksState, action: TasksAction): TasksState {
  switch (action.type) {
    case TaskActionTypes.LoadTasks:
      return {
        Tasks: action.payload
      }
    case TaskActionTypes.AddTask:
      return {
        Tasks: [...state.Tasks, action.payload],
      };
     case TaskActionTypes.DeleteTask:
       return {
         Tasks: state.Tasks.filter((task) => task._id !== action.payload._id),
       };
      case TaskActionTypes.UpdateTask:
        return {
          Tasks: state.Tasks.map(task => {
            if(task._id == action.payload._id){
              return action.payload;
            } else {
              return task;
            }
          }),
        }  
    default: 
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  listState: ListsReducer,
  tasksState: TasksReducer
};

export const selectLists = (state: AppState) => state.listState.Lists;
export const selectTasks = (state: AppState) => state.tasksState.Tasks;
export const selectedList = (state: AppState) => state.listState.selectedList;
export const metaReducers: MetaReducer<ListsState>[] = !environment.production ? [] : [];
