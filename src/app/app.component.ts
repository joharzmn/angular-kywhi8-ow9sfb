import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { products } from './products';

import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'my-app',
  template: `

  <kendo-popup
    >
    <kendo-grid
    [kendoGridBinding]="gridView.data"
    [skip]="0"
    [pageSize]="pageSize"
    scrollable="virtual"
    [rowHeight]="36"
    [height]="450"
    [navigable]="true"
  >
    <kendo-grid-column field="id" [width]="80" title="ID">
      <ng-template kendoGridCellTemplate let-dataItem="dataItem">
          <div class="validation-column" kendoTooltip
              filter=".validation-column" position="right" [tooltipWidth]="250"
              [title]="dataItem['id']" style="cursor:pointer">Hover over me
          </div>
      </ng-template>
    </kendo-grid-column>
    <kendo-grid-column
      field="firstName"
      title="First Name"
      [width]="130"
    ></kendo-grid-column>
    <kendo-grid-column
      field="lastName"
      title="Last Name"
      [width]="130"
    ></kendo-grid-column>
    <kendo-grid-column
      field="city"
      title="City"
      [width]="130"
    ></kendo-grid-column>
    <kendo-grid-column
      field="title"
      title="Title"
      [width]="180"
    ></kendo-grid-column>
  </kendo-grid>
    </kendo-popup>


    <kendo-grid
    [kendoGridBinding]="gridView.data"
    [skip]="0"
    [pageSize]="pageSize"
    scrollable="virtual"
    [rowHeight]="36"
    [height]="450"
    [navigable]="true"
  >
    <kendo-grid-column field="id" [width]="80" title="ID">
      <ng-template kendoGridCellTemplate let-dataItem="dataItem">
          <div class="validation-column" kendoTooltip
              filter=".validation-column" position="right" [tooltipWidth]="250"
              [title]="dataItem['id']" style="cursor:pointer">Hover over me
          </div>
      </ng-template>
    </kendo-grid-column>
    <kendo-grid-column
      field="firstName"
      title="First Name"
      [width]="130"
    ></kendo-grid-column>
    <kendo-grid-column
      field="lastName"
      title="Last Name"
      [width]="130"
    ></kendo-grid-column>
    <kendo-grid-column
      field="city"
      title="City"
      [width]="130"
    ></kendo-grid-column>
    <kendo-grid-column
      field="title"
      title="Title"
      [width]="180"
    ></kendo-grid-column>
  </kendo-grid>
        
    `,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
            .k-grid .k-grid-content td {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        `,
  ],
})
export class AppComponent {
  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  public gridData: any[] = products;
  public gridView: GridDataResult;
  public data: unknown[];
  public pageSize = 20;
  public skip = 0;

  constructor() {
    this.data = this.createRandomData(100000);
    this.loadProducts();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadProducts();
  }

  private loadProducts(): void {
    this.gridView = {
      data: this.data.slice(),
      total: this.data.length,
    };
  }

  /* Generating example data */
  private createRandomData(count: number): unknown[] {
    const firstNames = [
        'Nancy',
        'Andrew',
        'Janet',
        'Margaret',
        'Steven',
        'Michael',
        'Robert',
        'Laura',
        'Anne',
        'Nige',
      ],
      lastNames = [
        'Davolio',
        'Fuller',
        'Leverling',
        'Peacock',
        'Buchanan',
        'Suyama',
        'King',
        'Callahan',
        'Dodsworth',
        'White',
      ],
      cities = [
        'Seattle',
        'Tacoma',
        'Kirkland',
        'Redmond',
        'London',
        'Philadelphia',
        'New York',
        'Seattle',
        'London',
        'Boston',
      ],
      titles = [
        'Accountant',
        'Vice President, Sales',
        'Sales Representative',
        'Technical Support',
        'Sales Manager',
        'Web Designer',
        'Software Developer',
      ];

    return Array(count)
      .fill({})
      .map((_, idx) => ({
        id: idx + 1,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        title: titles[Math.floor(Math.random() * titles.length)],
      }));
  }
  public showTooltip(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (element.nodeName === 'TD' || element.className === 'k-column-title') {
      this.tooltipDir.toggle(element);
    } else {
      this.tooltipDir.hide();
    }
  }
}
