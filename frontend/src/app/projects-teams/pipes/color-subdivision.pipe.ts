import { Pipe, PipeTransform } from '@angular/core';
import { RadioButtonGroupCommonColor, SubdivisionColors } from '../../shared/const/subdivision-colors.const';

@Pipe({
  name: 'colorSubdivision'
})
export class ColorSubdivisionPipe implements PipeTransform {
  transform(name: string): string {
    if (!name || name === '') {
      return RadioButtonGroupCommonColor[1].color;
    }

    if (name && name === RadioButtonGroupCommonColor[0].value) {
      return RadioButtonGroupCommonColor[0].color;
    }

    const color = SubdivisionColors.find(item => item.title === name);

    return color ? color.color : RadioButtonGroupCommonColor[1].color;
  }
}
