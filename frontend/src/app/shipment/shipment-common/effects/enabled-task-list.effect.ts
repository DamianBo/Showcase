import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {State} from "../../../app.reducers";
import {Observable} from "rxjs/Observable";
import {TaskService} from "../api/task.service";
import * as actions from "../store/enbaled-tasks/enabled-task-list-page.actions";
import {EnabledTaskListSlice} from "../store/enbaled-tasks/enabled-task-list-page.slice";
import {
  RequestEnabledTasksFailedAction,
  RequestEnabledTasksSuccessfulAction
} from "../store/enbaled-tasks/enabled-task-list-page.actions";


@Injectable()
export class EnabledTaskListEffect {
  constructor(private _actions: Actions,
              private _taskService: TaskService,
              private _store: Store<State>) {
  }

  @Effect()
  requestEnabledTasksForShipment = this._actions
    .ofType(actions.REQUEST_ENABLED_TASKS_FOR_SHIPMENT)
    .map((action: actions.RequestEnabledTaskForShipmentAction) => action.trackingId)
    .switchMap((payload) => {
      return this._taskService.findEnabledTasksToShipment(payload);
    })
    .map(enabledTaskListSlice => new RequestEnabledTasksSuccessfulAction(enabledTaskListSlice))
    .catch(() => Observable.of(new RequestEnabledTasksFailedAction()));


  @Effect() loadEnabledTasks = this._actions
    .ofType(actions.REQUEST_ENABLED_TASKS)
    .withLatestFrom(this._store, (action, state) => state.enabledTaskListSlice)
    .switchMap(() => {
      return this._taskService.findAllEnabledTasks();
    })
    .map(enabledTaskListSlice => new RequestEnabledTasksSuccessfulAction(enabledTaskListSlice))
    .catch(() => Observable.of(new RequestEnabledTasksFailedAction()));

}
