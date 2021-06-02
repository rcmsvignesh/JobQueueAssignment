import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Job, JobStatus } from '../job.model';
import { JobService } from '../jobservice.service';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  id: number = 0;
  job: Job = new Job();
  jobFormGroup: FormGroup;
  enumKeys: string[];
  jobStatus = JobStatus;
  constructor(private _jobService: JobService, private _formBuilder: FormBuilder, private router: Router) {
    this.enumKeys = Object.keys(this.jobStatus);
    this.jobFormGroup = this._formBuilder.group({
      'name': new FormControl(this.job.name, [Validators.required]),
      'description': new FormControl(this.job.description, [Validators.required]),
      'status': new FormControl(this.job.status, [Validators.required]),
      'priority': new FormControl(this.job.priority, [Validators.required])
    });
  }

  ngOnInit(): void {
  
  }

  get getJobFormControls() {
    return this.jobFormGroup.controls;
  }

  CreateJob(): void {
    let request: Job = new Job();
    request.id = new Date().getMilliseconds();
    request.name = this.getJobFormControls.name?.value;
    request.description = this.getJobFormControls.description?.value;
    request.status = this.getJobFormControls.status?.value;
    request.priority = this.getJobFormControls.priority?.value;

    this._jobService.saveToService("http://localhost:3000/jobs", request).subscribe((data: Job) => {
      alert("Job Creation successful!");
      this.router.navigate(['/home']);
    }, (error: any) => {
      alert("Failure! Please retry.");
    })

  }
}
