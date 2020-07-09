import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
  activeIndex: number = null;

  @ViewChild('quickSearch') quickSearch: ElementRef;

  constructor(private employeeApi: EmployeeApiService, private router: Router) {}

  ngOnInit() {
    this.employeeApi.loadAllEmployees().subscribe(e => {
      this.filteredEmployees = [...e];
      this.employees = e;
    });
  }

  @HostListener('document:keydown', ['$event'])
  onKeeDown(event: KeyboardEvent): void {
    if (this.activeIndex === null) {
      this.activeIndex = 0;
      this.onActiveElementChange();
      return;
    }

    if (event.code == 'ArrowUp' && this.activeIndex > 0) {
      this.activeIndex--;
      this.onActiveElementChange();
    }
    if (event.code == 'ArrowDown' && this.activeIndex < this.filteredEmployees?.length - 1) {
      this.activeIndex++;
      this.onActiveElementChange();
    }
  }

  onActiveElementChange() {
    const str = `list${this.activeIndex}`;
    const element = document.getElementById(str);
    element.scrollIntoView();
    window.scrollTo(0, 0);
  }

  onFilterBlur() {
    /** Таймаут нужен, чтоб успела отработать навигация */
    setTimeout(() => {
      this.showDropdown = false;
      this.filter = '';
      this.activeIndex = null;
      this.quickSearch.nativeElement.blur();
      this.getFilteredEmployees();
    }, 200);
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

    if (this.filteredEmployees.length > 1 && this.activeIndex) {
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
