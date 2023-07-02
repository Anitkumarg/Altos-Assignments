import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  tableData: any[] = [];
  selectedRowIndex: number = -1;
  form!: FormGroup;

  constructor(
    private datePipe: DatePipe,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.sharedService.formData$.subscribe((formData: any) => {
      if (this.selectedRowIndex > -1) {
        // Update existing row
        const selectedRow = this.tableData[this.selectedRowIndex];
        Object.assign(selectedRow, formData);
        selectedRow.updatedOn = this.getCurrentDateTime();
        this.selectedRowIndex = -1; // Clear selected row index after updating
      } else {
        // Add new row
        const newRow = {
          id: this.generateUniqueId(),
          ...formData,
          createdOn: this.getCurrentDateTime(),
        };
        this.tableData.push(newRow);
      }
      this.resetForm(); // Reset the form after saving data
    });

    this.sharedService.editRowData$.subscribe((rowData: any) => {
      const index = this.tableData.findIndex((row) => row.id === rowData.id);
      if (index > -1) {
        this.selectedRowIndex = index;
        this.form.patchValue(rowData);
      }
    });
  }

  updateItem(rowData: any): void {
    this.sharedService.updateFormData(rowData);
  }

  deleteItem(rowIndex: number): void {
    this.tableData.splice(rowIndex, 1);
  }

  showKraModal(content: any): void {
    this.modalService.open(content);
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: [''],
      grade: ['', Validators.required],
      kra: ['', Validators.required],
      status: ['Active', Validators.required],
    });
  }

  private resetForm(): void {
    this.form.reset();
  }

  private getCurrentDateTime(): string {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(
      currentDate,
      'dd-MMM-yyyy hh:mm a'
    );
    return formattedDate || ''; // Return an empty string if formattedDate is null
  }

  private generateUniqueId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
