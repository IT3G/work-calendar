import { Pipe, PipeTransform } from '@angular/core';
import { notFindColor, radioButtonGroupCommonColor, subdivisionColors } from '../const/subdivision-colors.const';

@Pipe({
  name: 'colorSubdivision'
})
export class ColorSubdivisionPipe implements PipeTransform {
  transform(subdivision_id: string): string {
    if (!subdivision_id || subdivision_id === '') {
      return radioButtonGroupCommonColor[1].color;
    }

    const color = subdivisionColors.find(item => item.subdivision_id === subdivision_id);

    if (!color) {
      return notFindColor;
    }

    return color.color;
  }
}
