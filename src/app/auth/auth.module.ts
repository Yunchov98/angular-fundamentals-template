import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { SessionStorageService } from './services/session-storage.service';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule, AuthRoutingModule],
    providers: [SessionStorageService, AuthService],
})
export class AuthModule {}
