import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit, OnChanges {
  @Input() book: Book | null = null;
  @Input() isEditing = false;
  @Output() save = new EventEmitter<Book>();
  @Output() cancel = new EventEmitter<void>();

  bookForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    this.initForm();
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      id: [this.book?.id || 0],
      title: [this.book?.title || '', [Validators.required, Validators.minLength(2)]],
      author: [this.book?.author || '', [Validators.required, Validators.minLength(2)]],
      isbn: [this.book?.isbn || '', [Validators.required, Validators.pattern(/^[\d\-]{10,17}$/)]],
      publicationDate: [
        this.book?.publicationDate ? this.formatDateForInput(this.book.publicationDate) : '',
        Validators.required
      ]
    });
  }

  formatDateForInput(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.save.emit(this.bookForm.value as Book);
    } else {
      this.bookForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  get f() { return this.bookForm.controls; }
}
