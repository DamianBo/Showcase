package org.educama.shipment.boundary;

import org.educama.shipment.api.datastructure.ShipmentTaskDS;
import org.educama.shipment.api.datastructure.CompletedTaskDS;


import java.util.List;


/**
 * Boundary service for shipment tasks.
 */
public interface ShipmentTaskBoundaryService {
    /**
     * Retrieves all tasks.
     *
     * @return a collection of all tasks
     */
     List<ShipmentTaskDS> findAllActive();


     /*
      * @return a collection of completed tasks for a Shipment
      */
     List<CompletedTaskDS> findAllCompletedTasksForShipment(String trackingId);
}
