import {
  Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ComponentFactoryResolver
} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
// calendar
import {
  startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import * as moment from 'moment';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: "#28ba62",
    secondary: "#2dd36f1f"
  }
};

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeDetail: FormGroup = new FormGroup({
    employeeId: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    emailId: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    employeeReferenceNo: new FormControl('', Validators.required),
    qualification: new FormControl('', Validators.required),
    college: new FormControl('', Validators.required),
    passedOut: new FormControl('', Validators.required),
    skills: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    attachmentIds: new FormControl('', Validators.required),
    joiningDate: new FormControl('', Validators.required),
    workMode: new FormControl('', Validators.required),
    teamName: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
  });

  customStyle = {
    objectFit: "cover",
    cursor: "pointer",
    fontWeight: '700'
  };
  employeeData: any = [];
  employeeAttendance: any;
  employeeTaskDetail: any;
  step: number = 1;
  isData: any = [];
  oneEmployee: boolean;
  employee: any
  attd: any;
  isEditTable: boolean = false;
  firstName: any;
  lastName: any;
  showModal: boolean = false;
  employeeDetails: any;
  attachment: any
  isNavOpen: boolean = true;
  taskDetails: any;
  UserId: string = localStorage.getItem('userId');
  isShown: boolean = true;
  EmployeeId: any = localStorage.getItem("EmployeeId");
  AttendanceId: any = localStorage.getItem("AttendanceId");
  // InTime: any = localStorage.getItem('InTime');
  attDetails: any;
  hour: any;
  minute: string;
  second: string;
  AMPM: any;
  check: boolean = true;
  AttendanceIds: any = [];
  InTime: any = [];
  addAttendance: FormGroup = new FormGroup({
    date: new FormControl(moment().format()),
    inTime: new FormControl(moment().format()),
    employeeId: new FormControl(this.EmployeeId)
  });




  constructor(private router: Router, private api: ApiServiceService, private http: HttpClient, private userService: UserServiceService,
  ) {
    // this.AttendanceId = localStorage.getItem('AttendanceId')
    // this.attendanceDetails('')
    // this.api.allEmployeeAttendance().subscribe(data => {
    //   this.attendace = data;
    //   console.log(this.attendace, 'dat')
    // })

    this.getAllDetails('');
    console.log("came");
  }

  ngOnInit(): void {
    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);

    if (localStorage.getItem('checkIn' + this.EmployeeId)) {
      console.log(this.EmployeeId, 'first')
      let test = localStorage.getItem('checkIn' + this.EmployeeId);
      console.log(test, 'second')

      this.check = JSON.parse(test);
    }
    this.getEmployeeDetailById('');
    this.getAttendanceById('');
    this.getemployeeTaskDetail();
  }

  getEmployeeDetailById(params: any) {

    this.api.getEmployeeDetailsById(this.EmployeeId).subscribe(data => {
      if (this.userService.Role == "Employee") {
        this.oneEmployee = true;
        this.employeeData = data
        console.log(params, 'params')
        console.log(this.employeeData, 'EmployeeData')
      }
    });


  }
  getAttendanceById(params: any) {
    this.api.getAttendanceDetailsById(this.EmployeeId).subscribe(data => {
      if (this.userService.Role == "Employee") {
        this.oneEmployee = true;
        console.log(this.userService.Role, 'this.userService.Role')
        this.employeeAttendance = data
        console.log(params, 'params')
        console.log(this.employeeAttendance, 'employeeAttendance')
      }
    });
  }
  getemployeeTaskDetail() {
    this.api.employeeTaskDetail(this.EmployeeId).subscribe(data => {
      if (this.userService.Role == "Employee") {
        this.oneEmployee = true;
        this.employeeTaskDetail = data
        console.log(data, 'paithjiyam geetha')
      }

    });
  }

  getAllDetails(params: any) {
    this.api.getUserDetails(this.EmployeeId, params).subscribe((data: any) => {
      console.log(data, "data for accordion")
      if (this.userService.Role == "Admin") {
        this.isData = data;
      }
      if (this.userService.Role == "Employee") {
        this.oneEmployee = false;
        console.log(this.oneEmployee, "wonenknkn")
        this.isData = Array.of(this.isData);
        console.log(this.isData, "while one emp");
      }
      // this.api.getTaskDetailById(this.EmployeeId).subscribe(data => {
      //   this.taskDetails = data;
      // })
    });
  }
  formData: any;
  resumeFormat: any = [];
  imageFormat: any = [];
  uploadcandidateFile = (files: any, type: string) => {
    console.log(files)
    for (var i = 0; i < files.length; i++) {
      console.log(this.formData, "form data")
      if (files[i].size > 1000000) {
        alert("file size should be less than 10MB");
      }
      else {
        if (type == 'resume' && this.resumeFormat.indexOf(files[i].type) != -1) {
          this.formData.append("resume", files[i]);
        }
        if (type == 'image' && this.imageFormat.indexOf(files[i].type) != -1) {
          this.formData.append("image", files[i]);
        }
        else {
          this.formData.append("other", files[i]);
        }
      }
    }
  }






  updateEmployee(employeeDetail: any) {
    if (this.step == 4)

      this.api.updateEmployeeDetails(employeeDetail).subscribe(data => {
        console.log(data, 'update')
        Swal.fire({
          text: 'Updated Sucessfully!',
          icon: 'success',
          timer: 1000
        });
        this.showModal = false;
        location.reload();
      });


  }

  getEmployeeDetails(data: any) {
    console.log(data, 'geetha')
    this.showModal = true;
    this.employee = data;
    this.attachment = [];
    this.api.getAttachmentDetail(data.employeeId).subscribe(data => {
      console.log(data, 'data')
      this.attachment = data;
      console.log(this.attachment, 'data')
    });
  }



  thisFormValid() {
    if (this.employeeDetail.invalid) {
      return true;
    }
    return false;
  }


  onClick() {
    this.router.navigate(['/addemployee'])
  }
  showNavContent: boolean;
  openNav() {
    let sidenav = document.getElementById("sideNav");
    let main = document.getElementById("main");
    if (window.innerWidth < 500) {
      if (this.showNavContent == false) {
        sidenav.style.width = "0px";
        main.style.marginLeft = "0px";
        this.showNavContent = true;
      }
      else {
        sidenav.style.width = "60px";
        main.style.marginLeft = "60px";
        this.showNavContent = false;
      }
    }
    else {

      if (this.isNavOpen == false) {
        sidenav.style.width = "60px";
        main.style.marginLeft = "60px";
        this.isNavOpen = true;
      }
      else {
        sidenav.style.width = "200px";
        main.style.marginLeft = "200px";
        this.isNavOpen = false;
      }
    }
  }
  leaveApplyOn(id: any) {
    console.log(id, 'helo')
    this.userService.EmployeeId = id
    console.log(this.userService.EmployeeId, 'pid')
    this.router.navigate(['/leave']);
  }
  attendanceApplyOn(id: any) {
    console.log(id, 'attendance')
    this.userService.EmployeeId = id
    console.log(this.userService.EmployeeId, 'pid')
    this.router.navigate(['/attendance']);
  }

  getAttendanceDetails() {
    this.api.getAttendanceDetails(this.EmployeeId).subscribe(data => {
      this.attd = data;
      console.log(data, "ahghgh details");
      for (let i = 0; i < this.attd.length; i++) {
        this.events = [
          ...this.events,
          {
            title: 'Present',
            start: startOfDay(new Date(this.attd[i].inTime)),
            color: colors.green,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
          },
        ];
      }
      console.log(this.events, "events array")
    })
  }


  // for calendar

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  weekdays: string[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: new Date(2022, 8, 2),
      end: new Date(2022, 8, 2),
      title: 'A 3 day event',
      color: { ...colors.red },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      }
    },
  ];

  activeDayIsOpen: boolean = false;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  updateDate(date: Date) {
    const hours = date.getHours();
    this.AMPM = hours >= 12 ? 'PM' : 'AM';
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;
    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;
    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();
    const seconds = date.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  }

  attendanceDetails(params: any) {
    // this.api.addAttendance(params).subscribe((data: any) => {
    //   this.AttendanceIds.push(data.attendanceId);
    //   this.InTime.push(data.inTime);
    //   this.check = !this.check;
    // });
    Swal.fire({
      title: "Are you sure want to CheckIn ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'CheckIn'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.addAttendance(params).subscribe((data: any) => {
          this.AttendanceIds.push(data.attendanceId);
          localStorage.setItem("AttendanceId", data.attendanceId);
          this.InTime.push(data.inTime);
          this.check = !this.check
          localStorage.setItem('checkIn' + this.EmployeeId, JSON.stringify(this.check));
          Swal.fire({
            text: 'CheckIn Sucessfully!',
            icon: 'success',
            timer: 1000
          });

        }, (error: Response) => {
          if (error.status === 400) {
            Swal.fire({
              text: 'User Already Checkin Today',
              icon: 'error',
              timer: 1000
            });
          }
        });
      }

    });

  }
  // attendanceDetails(params: any) {
  //   Swal.fire({
  //     title: "Are you sure want to CheckIn ?",
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'CheckIn'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.api.addAttendance(params).subscribe((data: any) => {
  //         this.AttendanceIds.push(data.attendanceId);
  //         localStorage.setItem("AttendanceId", data.attendanceId);
  //         this.InTime.push(data.inTime);
  //         this.check = !this.check
  //         localStorage.setItem('checkIn' + this.EmployeeId, JSON.stringify(this.check));
  //         Swal.fire({
  //           text: 'CheckIn Sucessfully!',
  //           icon: 'success',
  //           timer: 3000
  //         });

  //       }, (error: Response) => {
  //         if (error.status === 400) {
  //           Swal.fire({
  //             text: ' Applied for leave..Please Try Again',
  //             icon: 'error',
  //             timer: 3000
  //           });
  //         }

  //         if (error.status === 404) {
  //           Swal.fire({
  //             text: 'User Already Checkin Today ...Please Try Again',
  //             icon: 'error',
  //             timer: 3000
  //           });
  //         }
  //       });
  //     }
  //   });
  // }

  updateattendanceDetails() {
    let payload = {
      attendanceId: localStorage.getItem("AttendanceId"),
      employeeId: this.EmployeeId,
      outTime: moment().format()
    }
    Swal.fire({
      title: "Are you sure want to CheckOut ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'CheckOut'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.updateAttendance(payload).subscribe(data => {
          this.check = !this.check

          localStorage.setItem('checkIn' + this.EmployeeId, JSON.stringify(this.check));

          Swal.fire({
            text: 'CheckOut Sucessfully!',
            icon: 'success',
            timer: 1000
          });
          this.getAttendanceDetail();
        });
      }

    });
  }

  getAttendanceDetail() {
    this.api.getAttendanceDetails(this.EmployeeId).subscribe(data => {
      console.log(data, "fgfgdfg");
      this.attDetails = data
      console.log(this.attDetails, "this.attDetails");
    });
  }

  deleteEmployeedetails(id: any, uname: any) {
    Swal.fire({
      title: "Are you sure want to delete " + uname + " ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteUser(id).subscribe(() => {
          Swal.fire({
            text: 'Deleted Sucessfully!',
            icon: 'success',
            timer: 1000
          });
          this.getAllDetails('');
        });
      }
    });
  }
  prev() {
    this.step = this.step - 1;
  }

  next() {
    this.step = this.step + 1;
  }
  
  CloseButton() {
    this.showModal = false;
    window.location.reload()
  }
 
}

