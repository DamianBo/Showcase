import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {TaskService} from "../api/task.service";
import * as actions from "../store/enbaled-tasks/enabled-task-list-page.actions";
import {
  RequestEnabledTasksSuccessfulAction, StartEnabledTasksSuccessfulAction
} from "../store/enbaled-tasks/enabled-task-list-page.actions";
import {RequestTasksForShipmentAction} from "../store/tasks/task-list-page.actions";

@Injectable()
export class EnabledTaskListEffect {
  private lastId: string;

  constructor(private _actions: Actions,
              private _taskService: TaskService) {
  }

  @Effect()
  requestEnabledTasksForShipment = this._actions
    .ofType(actions.REQUEST_ENABLED_TASKS_FOR_SHIPMENT)
    .map((action: actions.RequestEnabledTasksForShipmentAction) => this.lastId = action.trackingId)
    .switchMap((payload) => {
      return this._taskService.findEnabledTasksToShipment(payload);
    })
    .map(enabledTaskListSlice => new RequestEnabledTasksSuccessfulAction(enabledTaskListSlice));

  @Effect()
  startEnabledTask = this._actions
    .ofType(actions.START_ENABLED_TASK)
    .map((action: actions.StartEnabledTaskAction) => {
      this.lastId = action.trackingId;
      return action;
    })
    .switchMap((payload) =>
      this._taskService.manuallyStartEnabledTask(payload.trackingId, payload.taskName)
    )
    .map((payload) => new StartEnabledTasksSuccessfulAction(payload));

  @Effect()
  getNewActioveTasks = this._actions
    .ofType(actions.START_ENABLED_TASKS_SUCCESSFUL)
    .map(() =>
      new RequestTasksForShipmentAction(this.lastId));
}
