import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {State} from "../../../app.reducers";
import {TaskService} from "../api/task.service";
import * as actions from "../store/enbaled-tasks/enabled-task-list-page.actions";
import {
  RequestEnabledTasksFailedAction, RequestEnabledTasksForShipmentAction,
  RequestEnabledTasksSuccessfulAction, StartEnabledTasksSuccessfulAction
} from "../store/enbaled-tasks/enabled-task-list-page.actions";
import {Store} from "@ngrx/store";
import {RequestTasksForShipmentAction, RequestTasksSuccessfulAction} from "../store/tasks/task-list-page.actions";

@Injectable()
export class EnabledTaskListEffect {
  private lastId: string;

  constructor(private _actions: Actions,
              private _taskService: TaskService,
              private _store: Store<State>) {
  }

  @Effect()
  requestEnabledTasksForShipment = this._actions
    .ofType(actions.REQUEST_ENABLED_TASKS_FOR_SHIPMENT)
    .map((action: actions.RequestEnabledTasksForShipmentAction) => this.lastId = action.trackingId)
    .switchMap((payload) => {
      return this._taskService.findEnabledTasksToShipment(payload)
    })
    .map(enabledTaskListSlice => new RequestEnabledTasksSuccessfulAction(enabledTaskListSlice));

  @Effect()
  startEnabledTask = this._actions
    .ofType(actions.START_ENABLED_TASK)
    .map((action: actions.StartEnabledTaskAction) => {
      return action
    })
    .switchMap((payload) =>
      this._taskService.manuallyStartEnabledTask(payload.trackingId, payload.taskName)
    )
    .map((payload) => new StartEnabledTasksSuccessfulAction(payload));

  @Effect()
  getNewActioveTasks = this._actions
    .ofType(actions.START_ENABLED_TASKS_SUCCESSFUL)
    .map(() =>
      new RequestTasksForShipmentAction(this.lastId))
}
