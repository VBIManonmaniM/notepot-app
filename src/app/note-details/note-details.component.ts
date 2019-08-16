import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, INotes } from 'store/store';
import { UPDATE_NOTE } from "../../store/action";
@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  @select() notes;
  @select() activeNoteId;
  private model: INotes = {
    id: '',
    title: '',
    content: '',
    lastUpdated: null
  }
  constructor(private ngRedux: NgRedux<IAppState>) { 
  }

  ngOnInit() {
    this.ngRedux.subscribe(() => {
      const {activeNoteId, notes} = this.ngRedux.getState();
      this.model = notes.filter(note => note.id === activeNoteId)[0];
    });
  }

  onChange() {
    this.ngRedux.dispatch({
      type: UPDATE_NOTE,
      note: this.model
    });
  }

}
