import { ContextStoreService } from './../../store/context-store.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence-page.component.html',
  styleUrls: ['./presence-page.component.scss']
})
export class PresencePageComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private contextStoreService: ContextStoreService,
    private contextService: ContextService
  ) {}

  id: number;
  private sub: any;

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.id = Number(this.route.snapshot.params.id);
      this.contextService.selectUser(this.id);
    } else {
      this.id = this.contextStoreService.getSelectedUser().id;
    }

    // this.id = this.route.snapshot.params.id
    //   ? this.route.snapshot.params.id
    //   : this.contextStoreService.getSelectedUser();

    //      contextStoreService

    // this.sub = this.route.params.subscribe(params => {
    //   this.id = +params['id']; // (+) converts string 'id' to a number
    //   alert(this.id);

    //   // In a real app: dispatch action to load the details here.
    // });
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
}
