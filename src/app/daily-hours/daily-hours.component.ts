import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {DataService} from "../data.service";
import {MatTableExporterDirective} from "mat-table-exporter";

@Component({
  selector: 'app-daily-hours',
  templateUrl: './daily-hours.component.html',
  styleUrls: ['./daily-hours.component.css']
})
export class DailyHoursComponent implements OnInit {
  @ViewChild('exporter') exporter!: MatTableExporterDirective;
  logged_role = localStorage.getItem('role');
  displayed_columns: string[] = ['date', 'hours', 'interventions'];
  hourForm = this.formBuilder.group({
    operator_id: [''],
    month: ['']
  });
  months = [];
  operators = [];
  hours = [];
  hours_filename = 'ore';

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
  }

  getMonths() {
    this.dataService.getMonths(this.hourForm.value.operator_id!).subscribe({
      next: (data: any) => {
        this.months = data;
      }
    });
  }

  getWeekDay(date: string) {
    let formattedDate = date.split('/').reverse().join('-');
    let d = new Date(formattedDate);
    return d.toLocaleString('it-IT', {weekday: 'long'});
  }

  select(event: Event, value: string) {
    const selectedValue = (event.target as HTMLInputElement).value;
    this.hourForm.patchValue({
      [value]: selectedValue
    });
    this.getMonths();
    if (value === 'operator_id') {
      this.hourForm.patchValue({
        month: ''
      });
      this.hours = [];
      this.months = [];
      this.getMonths();
    }
    if (this.hourForm.value.month && this.hourForm.value.operator_id) {
      this.dataService.getDailyHours(this.hourForm.value.operator_id, this.hourForm.value.month).subscribe({
        next: (data: any) => {
          this.hours = data;
          this.hours_filename = 'ore_' + this.hourForm.value.month?.replace('/', '-');
        }
      });
    }
  }

  getTotalHours() {
    return this.hours.map(t => t['hours']).reduce((acc, value) => acc + value, 0);
  }

  getTotalInterventions() {
    return this.hours.map(t => t['count']).reduce((acc, value) => acc + value, 0);
  }

  test = '';

  ngOnInit(): void {
    this.dataService.getUsers().subscribe({
      next: (data: any) => {
        this.operators = data;
      }
    });
  }

  protected readonly length = length;
}