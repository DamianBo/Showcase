import {Component, OnDestroy, OnInit} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable, Subscription} from "rxjs";
import {State} from "../../../app.reducers";
import {ActivatedRoute, Router} from "@angular/router";
import {CompletedTaskListSlice} from "../../shipment-common/store/completed-tasks/completed-task-list-page.slice";
import {CompletedTaskListModel, CompletedTaskListRowModel} from "./completed-task-list-page.model";
import {
  InitializeCompletedTaskListAction,
  RequestCompletedTaskForShipmentAction
} from "../../shipment-common/store/completed-tasks/completed-task-list-page.actions";


@Component({
  selector: "educama-completed-task-list-page",
  templateUrl: `./completed-task-list-page.component.html`
})
export class CompletedTaskListPageComponent implements OnInit, OnDestroy {

  // relevant slice of store and subscription for this slice
  public completedTaskListSlice: Observable<CompletedTaskListSlice>;
  public completedTaskListSliceSubscription: Subscription;

  // model for the page
  public completedTaskListModel: CompletedTaskListModel = new CompletedTaskListModel();

  constructor(private _router: Router,
              private _store: Store<State>,
              private _activatedRoute: ActivatedRoute) {

    this.completedTaskListSlice = this._store.select(state => state.completedTaskListSlice);

    this.completedTaskListSliceSubscription = this.completedTaskListSlice
      .subscribe(completedTaskListSlice => this.updateCompletedTaskListModel(completedTaskListSlice));
  }

  public ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this._store.dispatch(new RequestCompletedTaskForShipmentAction(params["id"]));
    });
  }

  public ngOnDestroy() {
    this._store.dispatch(new InitializeCompletedTaskListAction());
    this.completedTaskListSliceSubscription.unsubscribe();
  }

  // ***************************************************
  // Data Retrieval
  // ***************************************************

  private updateCompletedTaskListModel(completedTaskListSlice: CompletedTaskListSlice) {
    this.completedTaskListModel.completedTaskList =
      completedTaskListSlice.completedTaskList.map(
        completedTaskResource => new CompletedTaskListRowModel(
          completedTaskResource.trackingId,
          completedTaskResource.id,
          completedTaskResource.name,
          completedTaskResource.description,
          completedTaskResource.assignee,
          completedTaskResource.endTime)
      );

  }
}
