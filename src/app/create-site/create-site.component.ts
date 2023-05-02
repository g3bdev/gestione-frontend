import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.css']
})
export class CreateSiteComponent implements OnInit {

  clients = [];
  message = '';
  newSiteForm = this.formBuilder.group({
    code: ['', Validators.required],
    description: ['', Validators.required],
    client_id: ['', Validators.required],
  });
  error: any;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
  }

  select(event: Event, value: string) {
    this.newSiteForm.patchValue({
      [value]: (event.target as HTMLInputElement).value
    })
  }

  submitForm() {
    this.dataService.createCommission(this.newSiteForm.value).subscribe({
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
