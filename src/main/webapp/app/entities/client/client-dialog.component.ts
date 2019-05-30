import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { DATE_TIME_FORMAT } from 'app/shared';
import { Client, IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client/client.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ClientPopupService } from 'app/entities/client/client-popup.service';

@Component({
  selector: 'jhi-client-dialog',
  templateUrl: './client-dialog.component.html'
})
export class ClientDialogComponent implements OnInit {
  client: IClient;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    sharedKey: [null, [Validators.required]],
    businessId: [null, [Validators.required, Validators.maxLength(100)]],
    email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: []
  });

  constructor(
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.updateForm(this.client);
  }

  updateForm(client: IClient) {
    if (client) {
      this.editForm.patchValue({
        id: client.id,
        sharedKey: client.sharedKey,
        businessId: client.businessId,
        email: client.email,
        phone: client.phone,
        dataAdded: client.dataAdded != null ? client.dataAdded.format(DATE_TIME_FORMAT) : null
      });
    }
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.isSaving = true;
    const client = this.createFromForm();
    if (client.id !== undefined) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  private createFromForm(): IClient {
    return {
      ...new Client(),
      id: this.editForm.get(['id']).value,
      sharedKey: this.editForm.get(['sharedKey']).value,
      businessId: this.editForm.get(['businessId']).value,
      email: this.editForm.get(['email']).value,
      phone: this.editForm.get(['phone']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>) {
    result.subscribe((res: HttpResponse<IClient>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess(result: IClient) {
    this.isSaving = false;
    this.activeModal.dismiss(result);
    this.eventManager.broadcast({ name: 'clientListModification', content: 'OK' });
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}

@Component({
  selector: 'jhi-client-popup',
  template: ''
})
export class ClientPopupComponent implements OnInit, OnDestroy {
  routeSub: any;

  constructor(private route: ActivatedRoute, private clientPopupService: ClientPopupService) {}

  ngOnInit() {
    this.routeSub = this.route.data.subscribe(({ client }) => {
      setTimeout(() => {
        this.clientPopupService.open(ClientDialogComponent as Component, client);
      }, 0);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
