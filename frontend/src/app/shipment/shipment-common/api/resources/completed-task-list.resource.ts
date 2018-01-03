import {AbstractListResource} from "../../../../shared/api/resources/abstract-list.resource";
import {CompletedTaskResource} from "./completed-task.resource";

export class CompletedTaskListResource extends AbstractListResource {
  public completedTasks: CompletedTaskResource[];
}
