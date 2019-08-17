import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends OnInit {
  showNote = true;
  @ViewChild('leftArrow') leftArrow: ElementRef;
  @ViewChild('rightArrow') rightArrow: ElementRef;
  
  ngOnInit() {
    // this.showNoteList();
  }

  hideNoteList() {
    (<any>document.getElementsByTagName('app-note-list')[0]).style.display = 'none';
    this.leftArrow.nativeElement.style.display = 'none';
    this.rightArrow.nativeElement.style.display = 'block';
  }

  showNoteList() {
    (<any>document.getElementsByTagName('app-note-list')[0]).style.display = 'block';
    this.leftArrow.nativeElement.style.display = 'block';
    this.rightArrow.nativeElement.style.display = 'none';
  }

}
