import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeIndex: number = 0;

  ngOnInit() { }

  navegate(x: number, y: number) {
    window.scroll(x, y);
  }

}
