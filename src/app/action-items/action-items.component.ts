import { Component, OnInit } from '@angular/core';
import { NgRedux } from "@angular-redux/store";
import { IAppState } from 'store/store';
import { ADD_NOTE, DELETE_NOTE, SEARCH_NOTE } from "../../store/action";
@Component({
  selector: 'app-action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.css']
})
export class ActionItemsComponent implements OnInit {
  searchText: string = '';
  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
  }

  createNote() {
    this.ngRedux.dispatch({
      type: ADD_NOTE
    });
  }

  deleteNote() {
    this.ngRedux.dispatch({
      type: DELETE_NOTE
    });
  }

  search() {
    this.ngRedux.dispatch({
      type: SEARCH_NOTE,
      searchText: this.searchText
    });
  }

  save() {
    window.localStorage.setItem('notes', JSON.stringify(this.ngRedux.getState()));
  }

}
