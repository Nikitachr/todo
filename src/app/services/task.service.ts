import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

constructor(private webReqService: WebRequestService) { }

getLists() {
  return this.webReqService.get<List[]>('lists');
}

getList(listId: string) {
  return this.webReqService.get<List>(`lists/${listId}`);
}

updateList(list: List){
  return this.webReqService.patch<List>(`lists/${list._id}`, list);
}

createList(title: string) {
  return this.webReqService.post<List>('lists', { title });
}

deleteList(id: string){
  return this.webReqService.delete<List>(`lists/${id}`);
}

getTasks(listId: string){
  return this.webReqService.get<Task[]>(`lists/${listId}/tasks`);
}

createTask(title: string, listId: string){
  return this.webReqService.post<Task>(`lists/${listId}/tasks`, { title });
}

updateTask(task: Task){
  return this.webReqService.patch<Task>(`lists/${task._listId}/tasks/${task._id}`, task);
}

deleteTask(task: Task){
  return this.webReqService.delete<Task>(`lists/${task._listId}/tasks/${task._id}`);
}
}
