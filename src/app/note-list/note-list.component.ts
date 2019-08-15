import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState,INotes } from 'store/store';
import { UPDATE_NOTE } from "../../store/action";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @select() notes;
  @select() activeNoteId;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
  }

}
