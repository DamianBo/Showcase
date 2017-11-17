package org.educama.shipment.api.resource;

import org.educama.shipment.api.datastructure.EnabledTaskDS;

/**
 * REST-Resource for enabled tasks.
 */
public class EnabledTaskResource {
    public String description;
    public String id;
    public String name;
    public String type;
    public String trackingId;

    public EnabledTaskResource fromEnabledTask(EnabledTaskDS enabledTask) {
        this.description = enabledTask.description;
        this.id = enabledTask.id;
        this.name = enabledTask.name;
        this.type = enabledTask.type;
        this.trackingId = enabledTask.trackingId;
        return this;
    }
}
