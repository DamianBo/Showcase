import {CompletedTaskResource} from "../../api/resources/completed-task.resource";

export interface CompletedTaskListSlice {
  completedTaskList: CompletedTaskResource[];
  loading: boolean;
}
