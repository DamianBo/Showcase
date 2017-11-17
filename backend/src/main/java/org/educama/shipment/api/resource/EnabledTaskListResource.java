package org.educama.shipment.api.resource;

import org.educama.shipment.api.datastructure.EnabledTaskDS;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * REST-Resource for list of shipment tasks.
 */
public class EnabledTaskListResource {

    public Collection<EnabledTaskResource> tasks;

    public EnabledTaskListResource fromTaskCollection(List<EnabledTaskDS> taskList) {
        this.tasks = new ArrayList<>();
        for (EnabledTaskDS currentTask : taskList) {
            tasks.add(new EnabledTaskResource().fromEnabledTask(currentTask));
        }
        return this;
    }
}
