import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDevise } from 'app/shared/model/devise.model';

@Component({
  selector: 'jhi-devise-detail',
  templateUrl: './devise-detail.component.html'
})
export class DeviseDetailComponent implements OnInit {
  devise: IDevise | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ devise }) => (this.devise = devise));
  }

  previousState(): void {
    window.history.back();
  }
}
