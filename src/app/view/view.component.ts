import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../job.model';
import { JobService } from '../jobservice.service';

@Component({
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id: number = 0;
  job: Job = new Job();

  constructor(private route: ActivatedRoute, private _jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this._jobService.getFromService("http://localhost:3000/jobs/" + this.id).subscribe(
        jobReturned => {
          this.job = jobReturned;
        },
        err => {
          alert(err);
        });
    });
  }

  deleteJob(): void {
    this._jobService.deleteToService("http://localhost:3000/jobs/", this.id).subscribe((data: Job) => {
      alert("Deleted successful!");
      this.router.navigate(['/view', this.id]);
    }, (error: any) => {
      alert("Failure! Please retry.");
    })
  }

}
