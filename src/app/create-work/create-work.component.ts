import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {CommonService} from "../common.service";

@Component({
  selector: 'app-create-work', templateUrl: './create-work.component.html', styleUrls: ['./create-work.component.css']
})
export class CreateWorkComponent implements OnInit {
  clients = [];
  plants = [];
  machines = [];
  commissions = [];
  intervention_types = [];
  intervention_locations = [];
  supervisors = [];
  email = '';
  fa_arrowLeft = faArrowLeft;
  reportForm = this.formBuilder.group({
    date: [new Date().toLocaleString("sv", {timeZone: 'Europe/Rome'}).replace(' ', 'T').substring(0, 10), Validators.required],
    intervention_duration: ['', Validators.required],
    intervention_type: ['', Validators.required],
    intervention_location: ['', Validators.required],
    client_id: ['', Validators.required],
    plant_id: ['', Validators.required],
    work_id: ['', Validators.required],
    type: ['', Validators.required],
    supervisor_id: ['', Validators.required],
    description: ['', Validators.required],
    notes: [''],
    trip_kms: [''],
    cost: [''],
    send_email: [false]
  });
  error: any;
  submitted: boolean = false;
  sending: boolean = false;
  duration_error = '';
  pdf_filename = '';
  today = new Date().toLocaleString("sv", {timeZone: 'Europe/Rome'}).replace(' ', 'T').substring(0, 10);
  twoMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 2)).toLocaleString("sv", {timeZone: 'Europe/Rome'}).replace(' ', 'T').substring(0, 10);

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private common: CommonService) {
  }

  get isMachinesEmpty() {
    return this.machines.length === 0;
  }

  get isCommissionsEmpty() {
    return this.commissions.length === 0;
  }

  get isClientSelected() {
    return this.reportForm.value.client_id !== '';
  }

  get isMachine() {
    return this.reportForm.value.plant_id !== 'c';
  }

  select(event: Event, value: string) {
    this.reportForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
    if (value === 'client_id') {
      this.dataService.getPlantsByClient(+this.reportForm.value.client_id!).subscribe({
        next: (data: any) => {
          this.plants = data;
          this.dataService.getOpenCommissionsByClient(+this.reportForm.value.client_id!).subscribe({
            next: (data: any) => {
              this.commissions = data;
              this.dataService.getSupervisorsByClient(+this.reportForm.value.client_id!).subscribe({
                next: (data: any) => {
                  this.supervisors = data;
                  this.email = '';
                }
              });
            }
          });
        }
      });
      this.reportForm.patchValue({
        plant_id: 'c',
        work_id: ''
      });
    }
    if (value === 'plant_id') {
      if (this.reportForm.value.plant_id === 'c') {
        this.reportForm.patchValue({
          type: 'commission',
        });
        this.dataService.getOpenCommissionsByClient(+this.reportForm.value.client_id!).subscribe({
          next: (data: any) => {
            this.commissions = data;
          }
        });
      } else {
        this.reportForm.patchValue({
          type: 'machine',
        });
        this.dataService.getMachineByPlant(+this.reportForm.value.plant_id!).subscribe({
          next: (data: any) => {
            this.machines = data;
          }
        });
      }
    }
    if (value === 'supervisor_id') {
      this.dataService.getUserById(+this.reportForm.value.supervisor_id!).subscribe({
        next: (data: any) => {
          this.email = data.User.email;
        }
      });
    }
  }

  get form() {
    return this.reportForm.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.reportForm.invalid || !this.isDurationValid(this.reportForm.value.intervention_duration!)) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }
    if (this.reportForm.value.send_email) {
      this.sending = true;
      this.common.openSnackBar('Invio email in corso...');
      this.dataService.createReport(this.reportForm.value).subscribe({
        next: (data: any) => {
          let id = data.id;
          this.dataService.printReport(id).subscribe((response) => {
            this.dataService.getReportById(id).subscribe({
              next: (data: any) => {
                this.pdf_filename = data.Report.date.replaceAll('-', '') + '_' + data.last_name.toUpperCase() + '.pdf';
                let pdf = new File([response], this.pdf_filename, {type: 'application/pdf'});
                this.dataService.sendEmail(id, pdf, this.email).subscribe({
                  next: () => {
                    this.common.openSnackBar('Intervento salvato e inviato con successo!');
                    this.sending = false;
                    setTimeout(() => {
                      window.location.reload();
                    }, 3000);
                  }
                });
              }
            });
          });
        }
      });
    } else {
      this.dataService.createReport(this.reportForm.value).subscribe({
        next: () => {
          this.common.openSnackBar('Intervento salvato con successo!');
          window.scrollTo({top: document.documentElement.scrollHeight, behavior: 'smooth'});
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }, error: () => {
          this.common.openSnackBar('Si è verificato un errore. Riprova più tardi.');
        }
      });
    }
  }

  isDurationValid(value: string): boolean {
    if (value === '') {
      this.duration_error = 'Questo campo è obbligatorio.';
      return false;
    }
    if (parseFloat(value) > 16 || value.endsWith('.')) {
      this.duration_error = 'La durata non è valida.';
      return false;
    }
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(value) || value.startsWith('.')) {
      this.duration_error = 'La durata può contenere solo numeri e un punto.';
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.dataService.getClients().subscribe((data: any) => {
      this.clients = data;
      this.dataService.getInterventionTypes().subscribe((data: any) => {
        this.intervention_types = data;
        this.dataService.getLocations().subscribe((data: any) => {
          this.intervention_locations = data;
        });
      });
    });
  }

  protected readonly window = window;
}
