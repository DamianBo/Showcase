package org.educama.shipment.boundary;

import org.educama.shipment.api.datastructure.ShipmentTaskDS;

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

    /**
     * Retrieves all active tasks of a shipment.
     *
     * @return a collection of all active tasks to shipment
     */
    List<ShipmentTaskDS> findAllActiveForShipment(String trackingId);
}
