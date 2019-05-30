import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ClientsWebSharedCommonModule, ClientsWebSharedLibsModule } from './';

@NgModule({
  imports: [ClientsWebSharedLibsModule, ClientsWebSharedCommonModule],
  declarations: [],
  entryComponents: [],
  exports: [ClientsWebSharedCommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientsWebSharedModule {
  static forRoot() {
    return {
      ngModule: ClientsWebSharedModule
    };
  }
}
