import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  private formData = new Subject<any>();
  private editRowData = new Subject<any>();

  formData$ = this.formData.asObservable();
  editRowData$ = this.editRowData.asObservable();

  saveFormData(data: any) {
    this.formData.next(data);
  }

  updateFormData(data: any) {
    this.editRowData.next(data);
  }
}
