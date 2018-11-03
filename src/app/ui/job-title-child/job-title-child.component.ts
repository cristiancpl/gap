import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemBase, JobTitle } from '../../models/base.model';
import { JOB_TITLE_DATA } from '../../models/base.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-title-child',
  templateUrl: './job-title-child.component.html',
  styleUrls: ['./job-title-child.component.css']
})
export class JobTitleChildComponent implements OnInit {

  private _area: ItemBase;
  private _job_title: JobTitle;
  private _disabled: boolean;
  job_titles: JobTitle[] = [];

  @Input()
  set area(area: ItemBase) {
    this._area = area;
    this.job_titles = area ? JOB_TITLE_DATA.filter(x => x.idArea == area.id) : [];
  }
  get area(): ItemBase {
    return this._area;
  }

  @Input()
  set job_title(job_title: JobTitle) {
    this._job_title = job_title ? JOB_TITLE_DATA.find(x => x.id == job_title.id) : new JobTitle();
  }
  get job_title(): JobTitle {
    return this._job_title;
  }

  @Input()
  set disabled(disabled: boolean) {
    this._disabled = disabled ? true : false;
  }
  get disabled(): boolean {
    return this._disabled;
  }

  @Output() selectJobTitle = new EventEmitter<JobTitle>();
  onSelectJobTitle(jobTitle: JobTitle) {
    this.selectJobTitle.emit(jobTitle);
  }

  constructor() { }

  ngOnInit() {
  }

}
