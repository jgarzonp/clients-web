import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ClientsWebSharedModule } from 'app/shared';
import { ClientPopupService, ClientComponent, ClientDialogComponent, ClientPopupComponent, clientPopupRoute, clientRoute } from './';

const ENTITY_STATES = [...clientRoute, ...clientPopupRoute];

@NgModule({
  imports: [ClientsWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ClientComponent, ClientDialogComponent, ClientPopupComponent],
  entryComponents: [ClientComponent, ClientDialogComponent, ClientPopupComponent],
  providers: [ClientPopupService, { provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientsWebClientModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
