import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgenceVoyage } from 'app/shared/model/agence-voyage.model';

@Component({
  selector: 'jhi-agence-voyage-detail',
  templateUrl: './agence-voyage-detail.component.html'
})
export class AgenceVoyageDetailComponent implements OnInit {
  agenceVoyage: IAgenceVoyage | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agenceVoyage }) => (this.agenceVoyage = agenceVoyage));
  }

  previousState(): void {
    window.history.back();
  }
}
