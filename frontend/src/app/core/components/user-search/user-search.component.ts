import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../../shared/models/employee.model';
import { EmployeeApiService } from '../../services/employee-api.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  filter = '';
  employees: Employee[] = [];
  filteredEmployees: Employee[];
  showDropdown: boolean;
  activeIndex = 0;

  constructor(private employeeApi: EmployeeApiService, private router: Router) {}

  ngOnInit() {
    this.employeeApi.loadAllEmployees().subscribe(e => {
      this.employees = e;
    });
  }

  @HostListener('document:keydown', ['$event'])
  doSomething(event: KeyboardEvent): void {
    if (event.code == 'ArrowUp' && this.activeIndex > 0) {
      this.activeIndex--;
    }
    if (event.code == 'ArrowDown' && this.activeIndex < this.filteredEmployees?.length - 1) {
      this.activeIndex++;
    }
  }

  onFilterBlur() {
    /** Таймаут нужен, чтоб успела отработать навигация */
    setTimeout(() => (this.showDropdown = false), 200);
  }

  /**
   * Если результат один, то переходим на присутствие пользователя
   * Если результатов несколько, то переходим на список
   */
  onFilterEnterPress() {
    if (!this.filteredEmployees.length) {
      return;
    }

    if (this.filteredEmployees.length === 1) {
      this.router.navigateByUrl(`/presence/${this.filteredEmployees[0].mailNickname}`);
      this.onFilterBlur();
      return;
    }

    if (this.filteredEmployees.length > 1) {
      this.router.navigateByUrl(`/presence/${this.filteredEmployees[this.activeIndex].mailNickname}`);
      this.onFilterBlur();
      return;
    }

    this.router.navigateByUrl(`/team-presence?name=${this.filter}&fromFilter=true`);
    this.onFilterBlur();
  }

  getFilteredEmployees(): void {
    this.filteredEmployees = this.employees.filter(e => e.username.toLowerCase().includes(this.filter.toLowerCase()));
  }
}
