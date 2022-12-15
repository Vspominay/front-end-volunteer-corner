import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';
import * as moment from 'moment';
import { filter, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule, MatMomentDateModule, MatFormFieldModule, MatDatepickerModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatepickerComponent,
      multi: true
    }
  ]
})
export class DatepickerComponent implements OnInit, IFilterAngularComp, ControlValueAccessor {

  @Input() set date(value: { startDate: moment.Moment, endDate: moment.Moment }) {
    if (!value) return;
    this.valuePicker = value;
  }

  @Input() isShowHint: boolean = true;
  @Input() isDisableInputs: boolean = true;

  public valuePicker!: {
    startDate: moment.Moment,
    endDate: moment.Moment
  };
  public params!: IFilterParams;
  public range!: FormGroup;


  public floatPickerClass = () => 'ag-custom-component-popup';

  public onChange(value: any): void {};

  private _onTouched(): void {};

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _fb: FormBuilder) {}

  public ngOnInit(): void {
    this._initForm();
    this._controlRangeValues();
  }

  public get date(): { startDate: moment.Moment, endDate: moment.Moment } {
    return this.valuePicker;
  }

  public agInit(params: IFilterParams & { isShowHint: boolean, isDisableInputs: boolean }): void {
    [this.params, this.isShowHint] = [params, params.isShowHint];
  }

  public isFilterActive(): boolean {
    return this.date !== null;
  }

  public doesFilterPass(params: IDoesFilterPassParams): boolean {
    return this._getFormattedDate(new Date(params.data.createdDate) + '').isBetween(this.date.startDate, this.date.endDate);
  }

  public getModel() {
    if (!this.isFilterActive()) {
      return null;
    }

    return { value: this.date };
  }

  public setModel(model: any) {
  }

  public updateFilter(): void {
    this.registerOnChange(this.date);
    this.registerOnTouched(this.date);
    this.params.filterChangedCallback();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public writeValue(dateRange: { startDate: Date, endDate: Date }) {
    if (!dateRange || (dateRange && !dateRange.startDate || !dateRange.endDate)) return;

    this.date = {
      startDate: this._getFormattedDate(dateRange.startDate + ''),
      endDate: this._getFormattedDate(dateRange.endDate + '')
    };
  }

  private _getFormattedDate(date: string): moment.Moment {
    return moment(date, 'MM/DD/YYYY');
  }

  private _controlRangeValues(): void {
    this.range.valueChanges
        .pipe(
          takeUntil(this._destroy$),
          filter(({ startDate, endDate }) => !!startDate && !!endDate),
          map(({ startDate, endDate }) => ({
            startDate: this._getFormattedDate(startDate),
            endDate: this._getFormattedDate(endDate)
          }))
        )
        .subscribe(({ startDate, endDate }) => {
          this.date = {
            startDate,
            endDate
          }
          this.updateFilter();
        });
  }

  private _initForm(): void {
    this.range = this._fb.group({
      startDate: this._fb.control<Date | null>({ value: null, disabled: this.isDisableInputs }),
      endDate: this._fb.control<Date | null>({ value: null, disabled: this.isDisableInputs })
    });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
