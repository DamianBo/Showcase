import {Injectable} from "@angular/core";
import {RestClientService} from "../../../shared/http/services/rest-client.service";
import {Observable} from "rxjs/Observable";
import {TaskListResource} from "./resources/task-list.resource";
/*
 * Service to communicate with Task Resource
 */
@Injectable()
export class TaskService {

  private TASK_RESOURCE_PATH = "tasks";

  constructor(private _restClientService: RestClientService) {
  }

  /*
   * Find all tasks
   *
   * @return An observable array of all active tasks
   */
  public findTasks(): Observable<TaskListResource> {
    return this._restClientService.get(this.TASK_RESOURCE_PATH + "/active");
  }

  /*
 * Find all enabled tasks
 *
 * @return An observable array of all enabled tasks
 */
  public findAllEnabledTasks(): Observable<TaskListResource> {
    return this._restClientService.get(this.TASK_RESOURCE_PATH + "/enabled");
  }

  /*
 * Find all enabled tasks for a specific shipment
 *
 * @return An observable array of all enabled tasks for a shipment
 */
  public findEnabledTasksToShipment(trackingId: string): Observable<TaskListResource> {
    return this._restClientService.get(this.TASK_RESOURCE_PATH + "/enabled/" + trackingId);
  }

  public findCompletedTasksForShipment(trackingId: string): Observable<TaskListResource> {
    return this._restClientService.get(this.TASK_RESOURCE_PATH + "/completed/" + trackingId);
  }
}
