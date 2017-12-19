package org.educama.shipment.api.resource;

import org.educama.shipment.api.datastructure.CompletedTaskDS;

import java.util.Date;

/**
 * REST-Resource for completed shipment task.
 */
public class CompletedTaskResource {
    public String trackingId;
    public String taskId;
    public String name;
    public String description;
    public String assignee;
    public Date endTime;

    public CompletedTaskResource fromTask(CompletedTaskDS completedTask) {
        this.trackingId = completedTask.trackingId;
        this.taskId = completedTask.taskId;
        this.name = completedTask.name;
        this.description = completedTask.description;
        this.assignee = completedTask.assignee;
        this.endTime = completedTask.endTime;
        return this;
    }
}
