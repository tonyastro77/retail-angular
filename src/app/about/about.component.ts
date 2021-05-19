import { Component, OnInit } from '@angular/core';
import { LeadershipService } from '../services/leadership.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leadership: any;
  constructor(private leadershipservice: LeadershipService) { }

  ngOnInit(): void {
    this.leadershipservice.getItems()
     .subscribe(leaders => this.leadership = leaders);
  }

}
