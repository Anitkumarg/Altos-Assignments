import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limittext',
})
export class LimittextPipe implements PipeTransform {
  transform(value: string, limit: number): string {
    const words = value?.split(' ');

    if (words?.length > limit) {
      const truncatedWords = words.slice(0, limit);
      const truncatedText = truncatedWords.join(' ') + '...';
      return truncatedText;
    }

    return value;
  }
}
