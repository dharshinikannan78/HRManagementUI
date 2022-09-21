import {
  Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef
} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

// calendar

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';

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
};

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

 
  customStyle = {
    objectFit: "cover",
    cursor: "pointer"
  };
  isData: any;
  oneEmployee: boolean = true;
  employee: any
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
Team:string=localStorage.getItem("teamName");
isOpen:boolean=false;


step: number = 1;
isenable: boolean = false;
formData: any;
fileList: any[] = [];
resumeFormat: string[] = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/msword'];
imageFormat: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
attachmentIds: any = [];
attachmentName: any = [];
updateEmployeeDetail: FormGroup = new FormGroup({
  employeeId:new FormControl(''),
  firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    emailId: new FormControl('', Validators.required),
    qualification: new FormControl('', Validators.required),
    college: new FormControl('', Validators.required),
    passedOut: new FormControl('', Validators.required),
    skills: new FormControl('', Validators.required),
    workMode: new FormControl('', Validators.required),
   
    designation: new FormControl('', Validators.required),
    joiningDate: new FormControl('', Validators.required),
    teamName: new FormControl(''),
    position: new FormControl(''),
});

  constructor(private router: Router, private api: ApiServiceService, private http: HttpClient, private userService: UserServiceService,
  ) {
    
  }

  ngOnInit(): void {
    this.getAllDetails('');
  }
  getAllDetails(params:any) {
    this.api.getUserDetails(this.EmployeeId,params).subscribe((data:any) => {
      console.log(data,"data for accordion")
      if(this.userService.Role=="Admin"){
      this.isData = data;
   
   }  
      if (this.userService.Role == "TeamLeader"||this.userService.Role=="TeamMember") {
        this.oneEmployee = false;
        console.log(this.oneEmployee, "wonenknkn")
         this.isData = Array.of(this.isData);

         console.log(this.isData, "while one emp");
      }
      this.api.getTaskDetailById(this.EmployeeId).subscribe(data => {
        this.taskDetails = data;
      })
    });
  }
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


  deleteEmployeedetails(id:any,uname:any){
    Swal.fire({
      title: "Are you sure want to delete "+uname+" ?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
    this.api.deleteUser(id).subscribe(()=>{
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
  
  thisFormValid() {
    if (this.updateEmployeeDetail.invalid) {
      return true;
    }
    return false;
  }


  prev() {
    this.step = this.step - 1;
  }

  next() {
    this.step = this.step + 1;
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


  // for calendar

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

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
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors.red },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors.yellow },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 2),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors.blue },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors.yellow },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;


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
}

