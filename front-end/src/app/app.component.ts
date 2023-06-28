import { CoreService } from './core/core.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonAddEditComponent } from './person-add-edit/person-add-edit.component';
import { PersonService } from './services/person.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
[x: string]: any;

  displayedColumns: string[] = [

    'name',
    'email',
    'cpf',
    'password',
    'phone',
    'actions'];

  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(

    private _dialog: MatDialog,
    private _personService: PersonService,
    private _coreService: CoreService) {}

  ngOnInit(): void {

    this.getPersonList()
  }

  openAddEditPersonForm() {

    const dialogRef = this._dialog.open(PersonAddEditComponent);

    dialogRef.afterClosed().subscribe({

      next: (val) => {

        if (val) {

          this.getPersonList();
        }
      }
    })
  }

  getPersonList() {

    this._personService.getPersonList().subscribe({

      next: (res) => {

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },

      error: (err) => {

        console.log(err)
      }
    })
  }

  getPasswordMask(password: string): string {
    return '*'.repeat(password.length);
  }

  showPassword(password: string): void {
    const dialogRef = this._dialog.open(MatDialog, {
      data: { title: 'Password', message: password },
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        console.log('Dialog result:', val);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePerson(id: number) {

    this._personService.deletePerson(id).subscribe({

      next: (res) => {

        this._coreService.openSnackBar('Person Deleted!', 'done')
        this.getPersonList();
      },

      error: console.log,
    })
  }

  openEditPersonForm(data: any) {

   const dialogRef = this._dialog.open(PersonAddEditComponent, {

    data,
   });

   dialogRef.afterClosed().subscribe({

    next: (val) => {

      if (val) {

        this.getPersonList();
      }
    }
  })

  }
}
