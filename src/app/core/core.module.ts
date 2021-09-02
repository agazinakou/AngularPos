import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';

@NgModule({
 imports: [
   CommonModule,
   TableModule,
   CardModule,
   ButtonModule,
   ToolbarModule,
   CalendarModule,
   DialogModule
  ],
 declarations: [],
 exports: [
   CommonModule,
   FormsModule,
   TableModule,
   CardModule,
   ButtonModule,
   ToolbarModule,
   CalendarModule,
   DialogModule
  ]
})
export class CoreModule {}
