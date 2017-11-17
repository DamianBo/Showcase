package org.educama.shipment.boundary.impl;

import org.camunda.bpm.engine.CaseService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.runtime.CaseExecution;
import org.camunda.bpm.engine.runtime.CaseInstance;
import org.camunda.bpm.engine.task.Task;
import org.educama.shipment.api.datastructure.EnabledTaskDS;
import org.educama.shipment.api.datastructure.ShipmentTaskDS;
import org.educama.shipment.boundary.ShipmentTaskBoundaryService;
import org.educama.shipment.model.Shipment;
import org.educama.shipment.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Boundary service implementation for shipment tasks.
 */
@Service
@Transactional(readOnly = true)
public class ShipmentTaskBoundaryServiceImpl implements ShipmentTaskBoundaryService {

    @Autowired
    private ShipmentRepository shipmentRepository;
    @Autowired
    private TaskService taskService;
    @Autowired
    private CaseService caseService;

    @Override
    public List<ShipmentTaskDS> findAllActive() {
        Collection<Task> tasks = taskService.createTaskQuery().taskAssignee("educama").active().list();
        return  shipmentTaskFromTask(tasks);
    }

    @Override
    public List<ShipmentTaskDS> findAllActiveForShipment(String trackingId) {
        Collection<Task> active = taskService.createTaskQuery().caseInstanceBusinessKey(trackingId).active().list();
        return  shipmentTaskFromTask(active);
    }

    private  List<ShipmentTaskDS> shipmentTaskFromTask(Collection<Task> tasks) {
        List<ShipmentTaskDS> shipmentTasks = new ArrayList<ShipmentTaskDS>();
        for (Task task : tasks) {
            CaseInstance caseInstance = caseService.createCaseInstanceQuery().caseInstanceId(task.getCaseInstanceId()).active().singleResult();
            Shipment shipment = shipmentRepository.findOneBytrackingId(caseInstance.getBusinessKey());

            ShipmentTaskDS shipmentTaskDS = new ShipmentTaskDS(task.getDescription(), task.getId(), task.getName(), shipment.trackingId,
                    task.getCreateTime(), task.getDueDate(), task.getAssignee(), shipment.sender, shipment.receiver);
            shipmentTasks.add(shipmentTaskDS);
        }
        return shipmentTasks;
    }

    @Override
    public List<EnabledTaskDS> findAllEnabledTasksForShipment(String trackingId) {
        Collection<CaseExecution> caseExecutions = caseService.createCaseExecutionQuery().enabled().list();
        List<EnabledTaskDS> enabledShipmentTasks = new ArrayList<>();

        for (CaseExecution caseExecution : caseExecutions) {

            CaseInstance caseInstance = caseService.createCaseInstanceQuery().caseInstanceId(caseExecution.getCaseInstanceId()).active().singleResult();

            if (caseInstance.getBusinessKey().equals(trackingId)) {
                EnabledTaskDS enabledTaskDS = new EnabledTaskDS(caseExecution.getActivityDescription(), caseExecution.getActivityId(),
                        caseExecution.getActivityName(), caseExecution.getActivityType(), trackingId);
                enabledShipmentTasks.add(enabledTaskDS);
            }
        }
        return enabledShipmentTasks;
    }
}
