import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {InvoiceResource} from "../../shipment-common/api/resources/invoice.resource";

@Component({
  selector: "educama-shipment-invoice",
  templateUrl: "./shipment-invoice.component.html"
})
export class ShipmentInvoiceComponent {
  public disabled: boolean = true;
  public displayDialog: boolean;
  private trackingId: string;
  public invoiceCreationDate: string;
  public preCarriage: any;
  public exportInsurance: any;
  public exportCustomsClearance: any;
  public flightPrice: any;
  public importInsurance: any;
  public importCustomsClearance: any;
  public onCarriage: any;
  public managementFee: any;
  public serviceFee: any;
  public discount: any;

  @Output()
  public createInvoiceEvent: EventEmitter<InvoiceResource> = new EventEmitter();

  public addInvoiceItem() {
    this.displayDialog = true;
  }

  public saveInvoice() {
    this.createInvoiceEvent.emit(
      new InvoiceResource(
        this.trackingId, this.invoiceCreationDate, this.preCarriage, this.exportInsurance, this.exportCustomsClearance,
        this.flightPrice, this.importInsurance, this.importCustomsClearance, this.onCarriage, this.managementFee, this.serviceFee,
        this.discount
      ));
  }
}



