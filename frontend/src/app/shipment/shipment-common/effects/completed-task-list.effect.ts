import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {State} from "../../../app.reducers";
import {Observable} from "rxjs/Observable";
import {TaskService} from "../api/task.service";
import * as actions from "../store/completed-tasks/completed-task-list-page.actions";
import {
  RequestCompletedTasksFailedAction,
  RequestCompletedTasksSuccessfulAction
} from "../store/completed-tasks/completed-task-list-page.actions";


@Injectable()
export class CompletedTaskListEffect {
  constructor(private _actions: Actions,
              private _taskService: TaskService,
              private _store: Store<State>) {
  }

  @Effect()
  requestCompletedTasksForShipment = this._actions
    .ofType(actions.REQUEST_COMPLETED_TASKS_FOR_SHIPMENT)
    .map((action: actions.RequestCompletedTaskForShipmentAction) => action.trackingId)
    .switchMap((payload) => {
      return this._taskService.findCompletedTasksForShipment(payload);
    })
    .map(completedTaskListSlice => new RequestCompletedTasksSuccessfulAction(completedTaskListSlice))
    .catch(() => Observable.of(new RequestCompletedTasksFailedAction()));

}
