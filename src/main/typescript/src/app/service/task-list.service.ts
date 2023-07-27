import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {RxStompService} from "./rx-stomp.service";
import {TaskList} from "../board/task-list/TaskList";

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  apiUrl = environment.apiUrl;
  headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.authService.getToken(),
  });

  constructor(private httpClient: HttpClient, private authService: AuthService, private rxStompService: RxStompService) { }

  getTaskListsByBoardId(boardId: number) {
    return this.httpClient.get(this.apiUrl + '/api/v1/task-lists/board/' + boardId, {headers: this.headers, observe: 'response'});
  }

  addTaskList(taskList: any, boardId: number) {
    this.rxStompService.publish({destination: "/app/task-list-add/" + boardId, body: JSON.stringify(taskList)});
  }

  deleteTaskList(taskList: TaskList): void {
    this.rxStompService.publish({destination: '/app/task-list-delete/' + taskList.boardId , body: JSON.stringify(taskList.id)});
  }

  renameTaskList(taskList: TaskList): void {
    this.rxStompService.publish({destination: '/app/task-list-rename/' + taskList.boardId , body: JSON.stringify({title: taskList.title, taskListId: taskList.id})});
  }

  moveTaskList(taskListBeforeId, taskListAfterId, taskListId, boardId): void {
    this.rxStompService.publish({destination: '/app/task-list-move/' + boardId , body: JSON.stringify({
        taskListBeforeId: taskListBeforeId,
        taskListAfterId: taskListAfterId,
        taskListId: taskListId})});
  }
}
