import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ShipmentResource} from "../../shipment-common/api/resources/shipment.resource";
import {TranslateService} from "ng2-translate";

@Component({
    selector: "educama-shipment-list",
    templateUrl: "./shipment-list.component.html"
})
export class ShipmentListComponent {

    @Input()
    public shipmentList: ShipmentResource[];

    @Output()
    public selectedShipment: ShipmentResource = new ShipmentResource();

    @Output()
    public shipmentSelectedEvent: EventEmitter<string> = new EventEmitter();

    public emptyListMessage: string;

    constructor(_translateService: TranslateService) {
        _translateService.get("GENERIC_NO-RECORDS-FOUND")
            .subscribe(value => this.emptyListMessage = value);
    }

  @Output()
  public taskSelectedEvent: EventEmitter<string> = new EventEmitter();

  public onRowSelect(event: Event) {
    this.taskSelectedEvent.emit(this.selectedShipment.trackingId);
  }

}
