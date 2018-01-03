import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {CompletedTaskListPageComponent} from "./container/completed-task-list-page.component";
import {CompletedTaskListComponent} from "./presentationals/completed-task-list.component";

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CompletedTaskListPageComponent,
    CompletedTaskListComponent
  ],
  exports: [
    CompletedTaskListPageComponent
  ]
})
export class CompletedTaskListModule {
}
