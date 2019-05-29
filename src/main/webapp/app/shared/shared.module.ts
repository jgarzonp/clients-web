import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClientsWebSharedLibsModule, ClientsWebSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ClientsWebSharedLibsModule, ClientsWebSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ClientsWebSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientsWebSharedModule {
  static forRoot() {
    return {
      ngModule: ClientsWebSharedModule
    };
  }
}
