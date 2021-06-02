import { Component, OnInit } from '@angular/core';
import { Job } from '../job.model';
import { JobService } from '../jobservice.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _jobService: JobService) { }

  jobs: Job[] = [];

  ngOnInit(): void {
    this._jobService.getFromService("http://localhost:3000/jobs").subscribe(
      jobsReturned => {
        this.jobs = jobsReturned;
      },
      err => {
        alert(err);
      });
  }

}
