import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    combineLatest,
    debounceTime,
    filter,
    forkJoin,
    map,
    Observable,
    Subject,
    Subscription,
    switchMap,
} from 'rxjs';

import { MockDataService } from './mock-data.service';
import { PlanetAndCharacters } from './interfaces/types';
import Character from './interfaces/Character';
import Planet from './interfaces/Planet';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    searchTermByCharacters = new Subject<string>();
    charactersResults$!: Observable<Character[]>;
    planetAndCharactersResults$!: Observable<PlanetAndCharacters>;
    isLoading: boolean = false;
    subscriptions: Subscription[] = [];

    constructor(private mockDataService: MockDataService) {}

    ngOnInit(): void {
        this.initLoadingState();
        this.initCharacterEvents();
    }

    changeCharactersInput(element: any): void {
        const inputValue: string = element.target.value;
        this.searchTermByCharacters.next(inputValue);
    }

    initCharacterEvents(): void {
        this.charactersResults$ = this.searchTermByCharacters.pipe(
            filter((inputValue) => inputValue.length >= 3),
            debounceTime(300),
            switchMap((inputValue) =>
                this.mockDataService.getCharacters(inputValue)
            )
        );
    }

    loadCharactersAndPlanet(): void {
        const characters$: Observable<Character[]> =
            this.mockDataService.getCharacters();
        const planets$: Observable<Planet[]> =
            this.mockDataService.getPlanets();

        this.planetAndCharactersResults$ = forkJoin([
            characters$,
            planets$,
        ]).pipe(map(([characters, planets]) => [...characters, ...planets]));
    }

    initLoadingState(): void {
        const charactersLoader$ = this.mockDataService.getCharactersLoader();
        const planetsLoader$ = this.mockDataService.getPlanetLoader();

        this.subscriptions.push(
            combineLatest([charactersLoader$, planetsLoader$]).subscribe(
                ([charactersLoader, planetsLoader]) => {
                    this.isLoading = this.areAllValuesTrue([
                        charactersLoader,
                        planetsLoader,
                    ]);
                }
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }

    areAllValuesTrue(elements: boolean[]): boolean {
        return elements.every((el) => el);
    }
}
