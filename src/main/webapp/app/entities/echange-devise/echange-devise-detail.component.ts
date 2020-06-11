import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEchangeDevise } from 'app/shared/model/echange-devise.model';

@Component({
  selector: 'jhi-echange-devise-detail',
  templateUrl: './echange-devise-detail.component.html'
})
export class EchangeDeviseDetailComponent implements OnInit {
  echangeDevise: IEchangeDevise | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ echangeDevise }) => (this.echangeDevise = echangeDevise));
  }

  previousState(): void {
    window.history.back();
  }
}
