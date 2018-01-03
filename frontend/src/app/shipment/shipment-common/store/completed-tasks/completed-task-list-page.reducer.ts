import {ActionReducer, Action} from "@ngrx/store";
import * as actions from "./completed-task-list-page.actions";
import {CompletedTaskListSlice} from "./completed-task-list-page.slice";
import {COMPLETED_TASK_LIST_SLICE_INITIAL_STATE} from "./completed-task-list-page.initial-state";

export function completedTaskListPageReducer(state: CompletedTaskListSlice = COMPLETED_TASK_LIST_SLICE_INITIAL_STATE,
                                           action: Action): CompletedTaskListSlice {
  switch (action.type) {
    case actions.INITIALIZE_COMPLETED_TASK_LIST:
      return COMPLETED_TASK_LIST_SLICE_INITIAL_STATE;
    case actions.REQUEST_COMPLETED_TASKS_SUCCESSFUL:
      const requestCompletedTasksSuccessfulAction = action as actions.RequestCompletedTasksSuccessfulAction;
      return Object.assign({}, state, {
        completedTaskList: requestCompletedTasksSuccessfulAction.payload.tasks,
        loading: false
      });
    case actions.REQUEST_COMPLETED_TASKS_FAILED:
      return Object.assign({}, state, {
        loading: false
      });
    default:
      return state;
  }
}

export const COMPLETED_TASK_LIST_PAGE_REDUCER: ActionReducer<CompletedTaskListSlice> = completedTaskListPageReducer;
