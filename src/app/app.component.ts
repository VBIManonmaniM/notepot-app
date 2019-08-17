import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends OnInit {
  showNote = true;
  now: Date = new Date();
  @ViewChild('leftArrow') leftArrow: ElementRef;
  @ViewChild('rightArrow') rightArrow: ElementRef;
  
  constructor() {
    super();
    setInterval(() => {
      this.now = new Date();
    },1000);
  }

  ngOnInit() {
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
