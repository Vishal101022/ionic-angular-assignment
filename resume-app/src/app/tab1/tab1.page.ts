import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IonInput,
  IonItem,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/angular/standalone';



@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],

  imports: [
    ReactiveFormsModule,
    IonInput,
    IonItem,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  ],
  standalone: true,
})
export class Tab1Page implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      city: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    localStorage.setItem('formData', JSON.stringify(this.form.value));
    this.router.navigate(['/tabs/tab2']);
    console.log(this.form.value);
  }
}
