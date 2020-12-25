import { Injectable } from '@angular/core';

@Injectable()
export class SnowService {
  constructor() {
    const Snowflakes = require('magic-snowflakes');
    Snowflakes();
  }
}
