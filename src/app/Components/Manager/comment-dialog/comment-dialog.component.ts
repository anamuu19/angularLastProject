import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent {
  confirmForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize the form group with validation
    this.confirmForm = this.fb.group({
      comment: [this.data.comment || '', Validators.required]
    });
  }

  get comment() {
    return this.confirmForm.get('comment');
  }

  onConfirm(): void {
    if (this.confirmForm.valid) {
      this.dialogRef.close({ comment: this.comment?.value });
    } else {
      this.confirmForm.markAllAsTouched(); // Show validation errors
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
