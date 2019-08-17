import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux, select} from '@angular-redux/store';
import { IAppState, INotes } from 'store/store';
import { UPDATE_NOTE } from "../../store/action";
@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit, OnDestroy {
  @select() notes;
  @select() activeNoteId;
  private unsubscribe: any;
  private model: INotes = {
    id: '',
    title: '',
    content: '',
    lastUpdated: null,
    visible: true
  }
  constructor(private ngRedux: NgRedux<IAppState>) { 
    this.setActiveNote();
  }

  resetState() {
    this.model = {
      id: '',
      title: '',
      content: '',
      lastUpdated: null,
      visible: true
    };
  }

  setActiveNote = () => {
    const {activeNoteId, notes} = this.ngRedux.getState();
    const note = notes.find(note => note.id === activeNoteId);
    if (note) {
      this.model = note;
    } else {
      this.resetState();
    }
  }

  ngOnInit() {
    this.unsubscribe = this.ngRedux.subscribe(this.setActiveNote);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  onChange() {
    this.ngRedux.dispatch({
      type: UPDATE_NOTE,
      note: this.model
    });
  }

}
