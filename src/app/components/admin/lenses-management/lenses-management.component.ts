  // // import { Component } from '@angular/core';

  // // @Component({
  // //   selector: 'app-lenses-management',
  // //   templateUrl: './lenses-management.component.html',
  // //   styleUrls: ['./lenses-management.component.css']
  // // })
  // // export class LensesManagementComponent {

  // // }
  // import { Component, OnInit } from '@angular/core';
  // import { LensesService, Lenses } from 'src/app/services/lenses.service';
  // import { NgForm } from '@angular/forms';

  // @Component({
  //   selector: 'app-lenses-management',
  //   templateUrl: './lenses-management.component.html',
  //   styleUrls: ['./lenses-management.component.css']
  // })
  // export class LensesManagementComponent implements OnInit {

  //   lensesList: Lenses[] = [];
  //   selectedLens: Lenses | null = null; // for editing

  //   constructor(private lensesService: LensesService) { }

  //   ngOnInit(): void {
  //     this.loadLenses();
  //   }

  //   loadLenses(): void {
  //     this.lensesService.getAllLenses().subscribe({
  //       next: (data) => this.lensesList = data,
  //       error: (err) => console.error('Error loading lenses', err)
  //     });
  //   }

  //   onSelectLens(lens: Lenses) {
  //     this.selectedLens = { ...lens }; // clone to edit
  //   }

  //   onAddNew() {
  //     this.selectedLens = {
  //       lensId: '',
  //       brand: '',
  //       lensImage: '',
  //       shape: '',
  //       colour: '',
  //       price: 0,
  //       quantity: 0
  //     };
  //   }

  //   onDelete(lensId: string) {
  //     if(confirm('Are you sure you want to delete this lens?')) {
  //       this.lensesService.deleteLens(lensId).subscribe({
  //         next: () => {
  //           alert('Deleted successfully');
  //           this.loadLenses();
  //           this.selectedLens = null;
  //         },
  //         error: (err) => console.error('Delete failed', err)
  //       });
  //     }
  //   }

  //   onSubmit(form: NgForm) {
  //     if (!this.selectedLens) return;

  //     if (this.selectedLens.lensId) {
  //       // Update existing
  //       this.lensesService.updateLens(this.selectedLens).subscribe({
  //         next: () => {
  //           alert('Lens updated successfully');
  //           this.loadLenses();
  //           this.selectedLens = null;
  //           form.resetForm();
  //         },
  //         error: (err) => console.error('Update failed', err)
  //       });
  //     } else {
  //       // Add new
  //       this.lensesService.addLens(this.selectedLens).subscribe({
  //         next: () => {
  //           alert('Lens added successfully');
  //           this.loadLenses();
  //           this.selectedLens = null;
  //           form.resetForm();
  //         },
  //         error: (err) => console.error('Add failed', err)
  //       });
  //     }
  //   }

  //   onCancel() {
  //     this.selectedLens = null;
  //   }
  // }
// import { Component, OnInit } from '@angular/core';
// import { LensesService, Lenses } from 'src/app/services/lenses.service';

// @Component({
//   selector: 'app-lenses-management',
//   templateUrl: './lenses-management.component.html',
//   styleUrls: ['./lenses-management.component.css']
// })
// export class LensesManagementComponent implements OnInit {

//   lenses: Lenses[] = [];

//   // This fixes your error
//   newLens: Lenses = {
//     lensId: '',
//     brand: '',
//     lensImage: '',
//     shape: '',
//     colour: '',
//     price: 0,
//     quantity: 0
//   };

//   constructor(private lensesService: LensesService) {}

//   ngOnInit(): void {
//     this.fetchLenses();
//   }

//   fetchLenses(): void {
//     this.lensesService.getAllLenses().subscribe(data => {
//       this.lenses = data;
//     });
//   }

//   addLens(): void {
//     this.lensesService.addLens(this.newLens).subscribe(() => {
//       this.fetchLenses();
//       this.resetForm();
//     });
//   }

//   deleteLens(id: string): void {
//     this.lensesService.deleteLens(id).subscribe(() => {
//       this.fetchLenses();
//     });
//   }

//   editLens(lens: Lenses): void {
//     this.newLens = { ...lens };
//   }

//   resetForm(): void {
//     this.newLens = {
//       lensId: '',
//       brand: '',
//       lensImage: '',
//       shape: '',
//       colour: '',
//       price: 0,
//       quantity: 0
//     };
//   }
// }

import { Component, OnInit } from '@angular/core';
import { LensesService, Lenses } from 'src/app/services/lenses.service';

@Component({
  selector: 'app-lenses-management',
  templateUrl: './lenses-management.component.html',
  styleUrls: ['./lenses-management.component.css']
})
export class LensesManagementComponent implements OnInit {

  lenses: Lenses[] = [];
  lensData: Lenses = {
    lensId: '',
    brand: '',
    lensImage: '',
    shape: '',
    colour: '',
    price: 0,
    quantity: 0
  };

  constructor(private lensService: LensesService) {}

  ngOnInit(): void {
    this.loadLenses();
  }

  loadLenses(): void {
    this.lensService.getAllLenses().subscribe(data => this.lenses = data);
  }

  addOrUpdateLens(): void {
    if (!this.lensData.lensId) return;
    this.lensService.addLens(this.lensData).subscribe(() => {
      this.loadLenses();
      this.resetForm();
    });
  }

  editLens(lens: Lenses): void {
    this.lensData = { ...lens };
  }

  deleteLens(id: string): void {
    this.lensService.deleteLens(id).subscribe(() => this.loadLenses());
  }

  resetForm(): void {
    this.lensData = {
      lensId: '',
      brand: '',
      lensImage: '',
      shape: '',
      colour: '',
      price: 0,
      quantity: 0
    };
  }
}
