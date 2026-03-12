import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  showForm = false;
  isEditing = false;
  deleteConfirmId: number | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAll().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error('Failed to load books', err)
    });
  }

  openAddForm(): void {
    this.selectedBook = null;
    this.isEditing = false;
    this.showForm = true;
  }

  openEditForm(book: Book): void {
    this.selectedBook = { ...book };
    this.isEditing = true;
    this.showForm = true;
  }

  onFormSave(book: Book): void {
    if (this.isEditing && book.id) {
      this.bookService.update(book.id, book).subscribe({
        next: () => { this.loadBooks(); this.showForm = false; },
        error: (err) => console.error('Update failed', err)
      });
    } else {
      const { id, ...newBook } = book;
      this.bookService.create(newBook).subscribe({
        next: () => { this.loadBooks(); this.showForm = false; },
        error: (err) => console.error('Create failed', err)
      });
    }
  }

  onFormCancel(): void {
    this.showForm = false;
  }

  confirmDelete(id: number): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  deleteBook(id: number): void {
    this.bookService.delete(id).subscribe({
      next: () => { this.loadBooks(); this.deleteConfirmId = null; },
      error: (err) => console.error('Delete failed', err)
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
