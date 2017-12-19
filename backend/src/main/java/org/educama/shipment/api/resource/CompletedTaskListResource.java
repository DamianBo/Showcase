package org.educama.shipment.api.resource;

import org.educama.shipment.api.datastructure.CompletedTaskDS;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * REST-Resource for list of shipment tasks.
 */
public class CompletedTaskListResource {

    public Collection<CompletedTaskResource> tasks;

    public CompletedTaskListResource fromTaskCollection(List<CompletedTaskDS> taskList) {
        this.tasks = new ArrayList<>();
        for (CompletedTaskDS currentTask : taskList) {
            tasks.add(new CompletedTaskResource().fromTask(currentTask));
        }
        return this;
    }
}
