import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import {State} from "../../../app.reducers";
import {Address} from "../../../customer/customer-common/api/datastructures/address.datastructure";
import {ActivatedRoute, Router} from "@angular/router";
import {EnabledTaskListSlice} from "../../shipment-common/store/enbaled-tasks/enabled-task-list-page.slice";
import {EnabledTaskListModel, EnabledTaskListRowModel} from "./enabled-task-list-page.model";
import {
  InitializeEnabledTaskListAction,
  RequestEnabledTasksAction
} from "../../shipment-common/store/enbaled-tasks/enabled-task-list-page.actions";
import {RequestTasksAction} from "../../shipment-common/store/tasks/task-list-page.actions";



@Component({
  selector: "educama-enabled-task-list-page",
  templateUrl: `./enabled-task-list-page.component.html`
})
export class EnabledTaskListPageComponent implements OnInit, OnDestroy {

  // relevant slice of store and subscription for this slice
  public enabledTaskListSlice: Observable<EnabledTaskListSlice>;
  public enabledTaskListSliceSubscription: Subscription;

  // model for the page
  public enabledTaskListModel: EnabledTaskListModel = new EnabledTaskListModel();

  constructor(private _router: Router,
              private _store: Store<State>,
              private _activatedRoute: ActivatedRoute) {

    this.enabledTaskListSlice = this._store.select(state => state.enabledTaskListSlice);
    this.enabledTaskListSliceSubscription = this.enabledTaskListSlice
      .subscribe(enabledTaskListSlice => this.updateEnabledTaskListModel(enabledTaskListSlice));
  }

  public ngOnInit() {
    this._store.dispatch(new RequestEnabledTasksAction());
    /*
    this._activatedRoute.params.subscribe(params => {
      this._store.dispatch(new RequestEnabledTasksAction(params["id"]));
      });
  */
  }

  public ngOnDestroy() {
    this._store.dispatch(new InitializeEnabledTaskListAction());
    this.enabledTaskListSliceSubscription.unsubscribe();
  }

  // ***************************************************
  // Event Handler
  // ***************************************************

  public onTaskSelectedEvent(trackingId: string) {
    // todo: Add new service
  }

  // ***************************************************
  // Data Retrieval
  // ***************************************************

  private updateEnabledTaskListModel(enabledTaskListSlice: EnabledTaskListSlice) {
    this.enabledTaskListModel.enabledTaskList =
      enabledTaskListSlice.enabledTaskList.map(
        enabledTaskResource => new EnabledTaskListRowModel(
          enabledTaskResource.trackingId,
          enabledTaskResource.type,
          enabledTaskResource.name,
          enabledTaskResource.id,
          enabledTaskResource.description)
      );

  }
  private formatAddress(address: Address): string {
    let formatedAddress = "";
    formatedAddress += address.street + " ";
    formatedAddress += address.streetNo + ", ";
    formatedAddress += address.zipCode + " ";
    formatedAddress += address.city;
    return formatedAddress;
  }
}
