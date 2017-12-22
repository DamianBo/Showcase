package org.educama.shipment.api;

import org.educama.shipment.api.resource.ShipmentTaskListResource;
import org.educama.shipment.api.resource.CompletedTaskListResource;
import org.educama.shipment.boundary.ShipmentTaskBoundaryService;
import org.educama.shipment.api.datastructure.ShipmentTaskDS;
import org.educama.shipment.api.datastructure.CompletedTaskDS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/**
 * REST-Service to access shipment task resources.
 */
@RestController
@RequestMapping(path = ShipmentTaskController.SHIPMENTTASK_RESOURCE_PATH, produces = {MediaType.APPLICATION_JSON_VALUE})
public class ShipmentTaskController {

    public static final String SHIPMENTTASK_RESOURCE_PATH = "/educama/v1/tasks";

    @Autowired
    private ShipmentTaskBoundaryService shipmentTaskBoundaryService;

    /**
     *
     * @return a Tasklist assigned to user "educama"
     */
    @RequestMapping(method = RequestMethod.GET)
    public ShipmentTaskListResource getTasks() {
        List <ShipmentTaskDS> tasks = shipmentTaskBoundaryService.findAllActive();
        ShipmentTaskListResource taskList = new ShipmentTaskListResource().fromTaskCollection(tasks);
        return taskList;
    }

    /**
     *
     * @return a Completed Tasklist for a Sipment"
     */
    @RequestMapping(value = "/completed/{trackingId}", method = RequestMethod.GET)
    public CompletedTaskListResource getCompletedTasks(@PathVariable("trackingId") String trackingId) {
        List<CompletedTaskDS> completedTask = shipmentTaskBoundaryService.findAllCompletedTasksForShipment(trackingId);
        CompletedTaskListResource completedTaskListResource = new CompletedTaskListResource().fromTaskCollection(completedTask);
        return completedTaskListResource;
    }
}
