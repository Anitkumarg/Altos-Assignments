import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.subscribeToEditRowData();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      grade: ['', Validators.required],
      kra: ['', Validators.required],
      status: ['Active', Validators.required],
    });
  }

  private subscribeToEditRowData(): void {
    this.sharedService.editRowData$.subscribe((data) => {
      if (data) {
        this.form.patchValue({
          grade: data.grade,
          kra: data.kra,
          status: data.status,
        });
      }
    });
  }

  saveData(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.sharedService.saveFormData(formData);
      this.resetFields();
    }
  }

  resetFields(): void {
    this.form.reset();
  }
}
