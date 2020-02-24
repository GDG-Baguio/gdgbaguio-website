import { Component, OnInit } from '@angular/core';
import { MeetupService } from 'src/app/core/services/meetup.service';
import { eventInfo } from '../../../core/model/events.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'site-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  eventDetails: eventInfo;
  eventid;
  constructor(private meetupService: MeetupService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventid = this.route.snapshot.params.eventId;
    this.getGDGEventDetails(this.eventid);
  }

  getGDGEventDetails(event_id: string): void {
    this.meetupService.siteMeetupEventDetails(event_id)
      .subscribe(
        eventDetails => (
          this.eventDetails = eventDetails,
          console.log(this.eventDetails)
        )
      );
  }

}
