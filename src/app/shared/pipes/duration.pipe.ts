import { Pipe } from '@angular/core';

@Pipe({
    name: 'duration',
})
export class DurationPipe {
    transform(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return remainingMinutes < 10
            ? `${hours}h:0${remainingMinutes}m`
            : `${hours}h:${remainingMinutes}m`;
    }
}
