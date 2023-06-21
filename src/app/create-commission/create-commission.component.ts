import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-create-commission',
  templateUrl: './create-commission.component.html',
  styleUrls: ['./create-commission.component.css']
})
export class CreateCommissionComponent implements OnInit {
  clients = [];
  message = '';
  fa_arrowLeft = faArrowLeft;
  newCommissionForm = this.formBuilder.group({
    client_id: ['', Validators.required],
    code: ['', Validators.required],
    description: ['', Validators.required]
  });
  error: any;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  select(event: Event, value: string) {
    this.newCommissionForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
  }

  get form() {
    return this.newCommissionForm.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.newCommissionForm.invalid) {
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }
    this.dataService.createCommission(this.newCommissionForm.value).subscribe({
      next: () => {
        this.message = 'Commessa aggiunta con successo!';
        setTimeout(() => {
          this.router.navigate(['/dashboard']).then();
        }, 2000);
      },
      error: () => {
        this.message = '';
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getClients().subscribe((data: any) => {
      this.clients = data;
    });
  }

    protected readonly window = window;
}

