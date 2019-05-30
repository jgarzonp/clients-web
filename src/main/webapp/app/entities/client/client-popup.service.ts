import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IClient } from 'app/shared/model/client.model';

@Injectable()
export class ClientPopupService {
  private ngbModalRef: NgbModalRef;

  constructor(private modalService: NgbModal, private router: Router) {
    this.ngbModalRef = null;
  }

  open(component: Component, client?: IClient | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>((resolve, reject) => {
      const isOpen = this.ngbModalRef !== null;
      if (isOpen) {
        resolve(this.ngbModalRef);
      }
      setTimeout(() => {
        this.ngbModalRef = this.clientModalRef(component, client);
        resolve(this.ngbModalRef);
      }, 0);
    });
  }

  clientModalRef(component: Component, client: IClient): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.client = client;
    modalRef.result.then(
      result => {
        console.log(result);
        this.router.navigate(['/client', { outlets: { popup: null } }]);
        this.ngbModalRef = null;
      },
      reason => {
        console.log(reason);
        this.router.navigate(['/client', { outlets: { popup: null } }]);
        this.ngbModalRef = null;
      }
    );
    return modalRef;
  }
}
