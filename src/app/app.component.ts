import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('constructed');
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe((
      event /*: NavigationStart*/
    ) => {
      // You only receive NavigationStart events
      console.log(event);
    });
  }
}
