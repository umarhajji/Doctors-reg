import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Doctor } from 'src/app/Doctor';
import { DoctorsService } from 'src/app/Services/doctors.service';
import { MatTableDataSource } from'@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

displayedColumns: string[] = ["name", "username", "email", "phone", "address", "website"];
doctor!: Doctor;
dataSource!: MatTableDataSource<Doctor>;
data: Doctor[] = [] ;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
@ViewChild('input') input!: ElementRef;

  constructor(private doctorsService: DoctorsService) { }

  ngOnInit(): void {
    this.doctorsList()
  }

  doctorsList(){
    this.doctorsService.getDoctors()
    .subscribe({
      next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error:(err)=>{
      alert(err)
    }
  })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
