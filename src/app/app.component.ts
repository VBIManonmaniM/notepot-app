import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  showNote = true;

  hideNoteList() {
    (<any>document.getElementsByTagName('app-note-list')[0]).style.display = 'none';
    this.showNote = !this.showNote;
  }

  showNoteList() {
    (<any>document.getElementsByTagName('app-note-list')[0]).style.display = 'block';
    this.showNote = !this.showNote;
  }

}
