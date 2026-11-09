
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, Contact } from './contact.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  contacts: Contact[] = [];

  form: Contact = {
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  };

  editingId: string | null = null;
  errorMessage = '';
  successMessage = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  // Загрузка списка контактов
  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Не удалось загрузить контакты';
      }
    });
  }

  // Добавление или изменение контакта
  saveContact(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.editingId) {
      this.contactService.updateContact(this.editingId, this.form)
        .subscribe({
          next: () => {
            this.successMessage = 'Контакт успешно изменён';
            this.resetForm();
            this.loadContacts();
          },
          error: () => {
            this.errorMessage = 'Ошибка при изменении контакта';
          }
        });
    } else {
      this.contactService.addContact(this.form).subscribe({
        next: () => {
          this.successMessage = 'Контакт успешно добавлен';
          this.resetForm();
          this.loadContacts();
        },
        error: () => {
          this.errorMessage = 'Ошибка при добавлении контакта';
        }
      });
    }
  }

  // Заполнение формы данными контакта
  editContact(contact: Contact): void {
    this.form = { ...contact };
    this.editingId = contact._id ?? null;
    this.successMessage = '';
    this.errorMessage = '';
  }

  // Удаление контакта
  deleteContact(id: string): void {
    if (!window.confirm('Удалить этот контакт?')) {
      return;
    }

    this.contactService.deleteContact(id).subscribe({
      next: () => {
        this.successMessage = 'Контакт удалён';
        this.loadContacts();
      },
      error: () => {
        this.errorMessage = 'Ошибка при удалении контакта';
      }
    });
  }

  // Очистка формы
  resetForm(): void {
    this.form = {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    };

    this.editingId = null;
  }
}
