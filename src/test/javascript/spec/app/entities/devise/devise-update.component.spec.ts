import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WegaTravelPartnerManagerTestModule } from '../../../test.module';
import { DeviseUpdateComponent } from 'app/entities/devise/devise-update.component';
import { DeviseService } from 'app/entities/devise/devise.service';
import { Devise } from 'app/shared/model/devise.model';

describe('Component Tests', () => {
  describe('Devise Management Update Component', () => {
    let comp: DeviseUpdateComponent;
    let fixture: ComponentFixture<DeviseUpdateComponent>;
    let service: DeviseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WegaTravelPartnerManagerTestModule],
        declarations: [DeviseUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DeviseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeviseUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeviseService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Devise(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Devise();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
