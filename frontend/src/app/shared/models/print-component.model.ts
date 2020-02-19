import { EventEmitter } from '@angular/core';

/** Обязательные свойства для печатной компоненты */
export interface PrintComponent {
  /** емитер события готовности компоненты к печати */
  readyToPrint: EventEmitter<void>;
  /** Данные для рендеринга печатного вида */
  data: Object;
}
