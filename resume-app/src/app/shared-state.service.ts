import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedStateService {
  private formDataSubject = new BehaviorSubject<any>(null);
  // Observable for subscribers
  formData$ = this.formDataSubject.asObservable();

  // Method to update form data
  updateFormData(data: any) {
    this.formDataSubject.next(data);
  }
}
