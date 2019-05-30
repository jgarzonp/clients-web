import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { IClient } from 'app/shared/model/client.model';
import { ClientService } from './client.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit, OnDestroy {
  clients: IClient[];
  eventSubscriber: Subscription;

  sharedKey: string;
  filters: Array<any>;

  sharedKeyForm = this.fb.group({
    sharedKey: [null]
  });

  constructor(
    protected clientService: ClientService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    private fb: FormBuilder
  ) {}

  loadAll() {
    this.clientService
      .query({ filters: this.filters })
      .pipe(
        filter((res: HttpResponse<IClient[]>) => res.ok),
        map((res: HttpResponse<IClient[]>) => res.body)
      )
      .subscribe(
        (res: IClient[]) => {
          this.clients = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  filterBySharedKey() {
    this.filters = [];
    this.sharedKey = this.sharedKeyForm.get(['sharedKey']).value;
    if (this.sharedKey) {
      this.filters.push({ key: 'sharedKey', value: this.sharedKey });
    }
    this.loadAll();
  }

  ngOnInit() {
    this.filters = [];
    this.sharedKey = null;
    this.loadAll();
    this.registerChangeInClients();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IClient) {
    return item.id;
  }

  registerChangeInClients() {
    this.eventSubscriber = this.eventManager.subscribe('clientListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
