package org.educama.shipment.api.datastructure;

import java.util.Date;

/**
 * Re-usable data structure used by resources.
 */
public class CompletedTaskDS {
    public String trackingId;
    public String taskId;
    public String name;
    public String description;
    public String assignee;
    public Date endTime;

    public CompletedTaskDS(String trackingId, String taskId, String name, String description,
                          String assignee, Date endTime) {
        super();
        this.trackingId = trackingId;
        this.taskId = taskId;
        this.name = name;
        this.description = description;
        this.assignee = assignee;
        this.endTime = endTime;
    }
}
