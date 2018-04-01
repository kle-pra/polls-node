import { Component, OnInit, Input } from '@angular/core';
import { PollService } from '../../services/poll.service';
import { Poll } from '../../models/poll.model';

@Component({
  selector: 'app-poll-small',
  templateUrl: './poll-small.component.html',
  styleUrls: ['./poll-small.component.css']
})
export class PollSmallComponent implements OnInit {

  @Input() poll: Poll;
  selected: number;

  constructor(private pollService: PollService) { }

  ngOnInit() { }

  vote() {
    this.pollService.vote(this.poll._id, this.selected).subscribe(success => {

      console.log(success);
      //TO-DO: success flash

    }, error => {
      console.log(error);
      //TO-DO: error flash
    });
  }

}