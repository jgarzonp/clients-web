import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { Client, IClient } from 'app/shared/model/client.model';
import { ClientService } from './client.service';

@Component({
  selector: 'jhi-client-update',
  templateUrl: './client-update.component.html'
})
export class ClientUpdateComponent implements OnInit {
  client: IClient;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    sharedKey: [null, [Validators.required]],
    businessId: [null, [Validators.required, Validators.maxLength(100)]],
    email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: []
  });

  constructor(protected clientService: ClientService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);
      this.client = client;
    });
  }

  updateForm(client: IClient) {
    this.editForm.patchValue({
      id: client.id,
      sharedKey: client.sharedKey,
      businessId: client.businessId,
      email: client.email,
      phone: client.phone,
      dataAdded: client.dataAdded != null ? client.dataAdded.format(DATE_TIME_FORMAT) : null
    });
  }

  previousState() {
    window.history.back();
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
    const entity = {
      ...new Client(),
      id: this.editForm.get(['id']).value,
      sharedKey: this.editForm.get(['sharedKey']).value,
      businessId: this.editForm.get(['businessId']).value,
      email: this.editForm.get(['email']).value,
      phone: this.editForm.get(['phone']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>) {
    result.subscribe((res: HttpResponse<IClient>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
