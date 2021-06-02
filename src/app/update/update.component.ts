import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Job, JobStatus } from '../job.model';
import { JobService } from '../jobservice.service';

@Component({
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  id: number = 0;
  job: Job = new Job();
  jobFormGroup: FormGroup;
  enumKeys: string[];
  jobStatus = JobStatus;
  constructor(private route: ActivatedRoute, private _jobService: JobService, private _formBuilder: FormBuilder, private router: Router) {
    this.enumKeys = Object.keys(this.jobStatus);
    this.jobFormGroup = this._formBuilder.group({
      'name': new FormControl(this.job.name, [Validators.required]),
      'description': new FormControl(this.job.description, [Validators.required]),
      'status': new FormControl(this.job.status, [Validators.required]),
      'priority': new FormControl(this.job.priority, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this._jobService.getFromService("http://localhost:3000/jobs/" + this.id).subscribe(
        jobReturned => {
          this.job = jobReturned;
          this.jobFormGroup = this._formBuilder.group({
            'name': new FormControl(this.job.name, [Validators.required]),
            'description': new FormControl(this.job.description, [Validators.required]),
            'status': new FormControl(this.job.status, [Validators.required]),
            'priority': new FormControl(this.job.priority, [Validators.required])
          });

        },
        err => {
          alert(err);
        });
    });

  }

  get getJobFormControls() {
    return this.jobFormGroup.controls;
  }

  updateJob(): void {
    let request: Job = new Job();
    request.id = this.id;
    request.name = this.getJobFormControls.name?.value;
    request.description = this.getJobFormControls.description?.value;
    request.status = this.getJobFormControls.status?.value;
    request.priority = this.getJobFormControls.priority?.value;

    this._jobService.updateToService("http://localhost:3000/jobs", request, this.id).subscribe((data: Job) => {
      alert("Update successful!");
      this.router.navigate(['/view', this.id]);
    }, (error: any) => {
      alert("Failure! Please retry.");
    })

  }
}
