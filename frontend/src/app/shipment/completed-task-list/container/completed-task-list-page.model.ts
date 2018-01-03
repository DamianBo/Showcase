export class CompletedTaskListModel {
  public completedTaskList: CompletedTaskListRowModel[];
}


export class CompletedTaskListRowModel {
  public trackingId: string;
  public taskId: string;
  public name: string;
  public description: string;
  public assignee: string;
  public endTime: Date;

  constructor(trackingId: string,
              taskId: string,
              name: string,
              description: string,
              assignee: string,
              endTime: Date) {
    this.trackingId = trackingId;
    this.taskId = taskId;
    this.name = name;
    this.description = description;
    this.assignee = assignee;
    this.endTime = endTime;
  }
}
