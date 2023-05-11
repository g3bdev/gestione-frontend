import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-commission',
  templateUrl: './create-commission.component.html',
  styleUrls: ['./create-commission.component.css']
})
export class CreateCommissionComponent implements OnInit {
  clients = [];
  message = '';
  newCommissionForm = this.formBuilder.group({
    client_id: ['', Validators.required],
    code: ['', Validators.required],
    description: ['', Validators.required]
  });
  error: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  select(event: Event, value: string) {
    this.newCommissionForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    });
  }

  submitForm() {
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
}

