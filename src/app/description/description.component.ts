import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TasksModel } from 'src/app/models/tasks.models';
import { AgendaColors } from 'src/app/shared/const/agenda-colors.const';
import { DateConvertService } from 'src/app/shared/services/date-convert.service';
import { DatesStoreService } from 'src/app/store/dates-store.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  form: FormGroup;
  options: any[];
  tasks$: Observable<TasksModel[]>;

  constructor(
    private datesStoreService: DatesStoreService,
    private dateConvertService: DateConvertService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dateStart: [null, [Validators.required]],
      dateEnd: [null, [Validators.required]],
      type: [null, [Validators.required]],
      comment: []
    });
    this.getInfoFromStore();
    this.options = AgendaColors;
  }

  public addTask(): void {
    if (!this.form.invalid) {
      alert('Заполните форму');
      return;
    }

    this.datesStoreService.addTask({
      ...this.form.value
    });
    console.log(this.form.value);
  }

  public changeDateStart(date: NgbDateStruct): void {
    this.datesStoreService.setDateStart(this.dateConvertService.convertNgbDateToMoment(date));
  }

  public changeDateEnd(date: NgbDateStruct): void {
    this.datesStoreService.setDateEnd(this.dateConvertService.convertNgbDateToMoment(date));
  }

  private getInfoFromStore() {
    this.datesStoreService
      .getDateStart()
      .pipe(filter(i => !!i))
      .subscribe(res => {
        this.form.patchValue({ dateStart: res.toDate() });
      });

    this.tasks$ = this.datesStoreService.getTasks();
  }
}
