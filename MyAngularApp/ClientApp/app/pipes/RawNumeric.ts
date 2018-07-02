﻿import { Pipe, PipeTransform,LOCALE_ID } from '@angular/core';
import {  getLocaleId, getLocaleNumberSymbol, NumberSymbol,DecimalPipe } from '@angular/common';

@Pipe({ name: "RawNumeric" })
export class RawNumericPipe implements PipeTransform {

    constructor(private decimalpipe:DecimalPipe) {
        this.locale = getLocaleId(LOCALE_ID.toString());
        //this.currencySymbol = getLocaleCurrencySymbol(this.locale) || '';
        this.numFormatSymbol = getLocaleNumberSymbol(this.locale,NumberSymbol.Group);
    }
    locale: string;
    //currencySymbol: string;
    numFormatSymbol: string;
    //percentSymbol: string;
    transform(value: string, args: string[]): any {
        if (!value) return value;
        let regx =new RegExp('^[0-9'+this.numFormatSymbol+']','g');
        return this.decimalpipe.transform(value.replace(regx, ''),undefined,this.locale);
    }
}