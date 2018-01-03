import {Action} from "@ngrx/store";
import {TaskListResource} from "../../api/resources/task-list.resource";

// Initialize Actions
export const INITIALIZE_COMPLETED_TASK_LIST = "INITIALIZE_COMPLETED_TASK_LIST";

// Tasks API Actions
export const REQUEST_COMPLETED_TASKS = "REQUEST_COMPLETED_TASKS";
export const REQUEST_COMPLETED_TASKS_SUCCESSFUL = "REQUEST_COMPLETED_TASKS_SUCCESSFUL";
export const REQUEST_COMPLETED_TASKS_FAILED = "REQUEST_COMPLETED_TASKS_FAILED";
export const REQUEST_COMPLETED_TASKS_FOR_SHIPMENT = "REQUEST_COMPLETED_TASKS_FOR_SHIPMENT";

// Actions
export class InitializeCompletedTaskListAction implements Action {
  type = INITIALIZE_COMPLETED_TASK_LIST;

  constructor() {
  }
}

export class RequestCompletedTasksAction implements Action {
  type = REQUEST_COMPLETED_TASKS;

  constructor() {
  }
}

export class RequestCompletedTaskForShipmentAction implements Action {
  type = REQUEST_COMPLETED_TASKS_FOR_SHIPMENT;

  constructor(public trackingId: string) {
  }
}

export class RequestCompletedTasksSuccessfulAction implements Action {
  type = REQUEST_COMPLETED_TASKS_SUCCESSFUL;

  constructor(public payload: TaskListResource) {
  }
}

export class RequestCompletedTasksFailedAction implements Action {
  type = REQUEST_COMPLETED_TASKS_FAILED;

  constructor() {
  }
}
