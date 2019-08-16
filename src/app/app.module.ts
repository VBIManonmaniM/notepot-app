import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ActionItemsComponent } from './action-items/action-items.component';
import { NoteListComponent, FilterNotes } from './note-list/note-list.component';
import { NoteDetailsComponent } from './note-details/note-details.component';

import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { rootReducer, IAppState, INITIAL_STATE } from "../store/store";


@NgModule({
  declarations: [
    AppComponent,
    ActionItemsComponent,
    NoteListComponent,
    NoteDetailsComponent,
    FilterNotes
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private ngRedux: NgRedux<IAppState>) {
    this.ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
