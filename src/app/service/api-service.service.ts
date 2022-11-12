import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  // URL = 'http://localhost:8082/api/';
  URL = environment.baseURL;
  photoUrl = environment.photoURL;
  dologin = this.URL + 'Login/Login';
  addUserCredentials = this.URL + 'Login/AddUser';
  attendanceDetails = this.URL + 'Attendance/AttendanceDetails?data=';
  editUserCredentials = this.URL + 'Login/EditLogin';
  employeeDetailsName = this.URL + 'Employee/AllEmployee';
  allEmployeeDetailsWithPhoto = this.URL + 'Employee/getEmployeeDetailsWithPhoto?projId=';
  GetallEmployeesName = this.URL + 'Employee/getEmployeesName';
  addemployeeDetail = this.URL + 'Employee/AddEmployee?login=';
  updateEmployeeDetail = this.URL + 'Employee/Update';
  uploadFile = this.URL + 'FileAttachment/Attachment';
  attachmentFileDetails = this.URL + 'FileAttachment/GetAttachmentDetails?candidateId=';
  applyLeave = this.URL + 'Leave/ApplyLeave';
  getEmployeeDetailById = this.URL + 'Employee/GetEmployeeDetailsById?id=';
  employeeLeaveDetails = this.URL + 'Leave/GetAllLeaveDetails';
  getUser = this.URL + 'Employee/GetUser?data=';
  getAttendance = this.URL + 'Attendance/GetAttendance?data=';
  attendance = this.URL + 'Attendance/AddAttendance?id=';
  updAttendance = this.URL + 'Attendance/updateAttendance?id=';
  checkAttdStatus = this.URL + 'Attendance/CheckAttendanceState?id=';
  taskDetails = this.URL + 'TaskDetails/AddTaskDeatils';
  getEmployeeTaskDetails = this.URL + 'TaskDetails/taskDetailsForProfile?EmployeeId=';
  getTeamTaskDetails = this.URL + 'TaskDetails/employeeId?id=';
  getTeamLeader = this.URL + 'TaskDetails/Team?team=';
  addProjectDetail = this.URL + 'ProjectDetails/AddEmployeeDetails';
  updateProjectDetails = this.URL + 'ProjectDetails/UpdateTaskDetails';
  getProjectDetails = this.URL + 'ProjectDetails/getDetails?projectTitle=';
  getTaskDetails = this.URL + 'ProjectDetails/TaskName?taskName=';
  getTaskDetailsById = this.URL + 'TaskDetails/EmployeeId?EmployeeId=';
  updateByProjectId = this.URL + 'ProjectDetails/ProjectId?projectId=';
  updateByTaskDetails = this.URL + 'TaskDetails/Update';
  deleteEmployee = this.URL + "Employee/DeleteEmployee?Id=";
  // jwtToken = this.URL + "jwt";
  getOverAllAttendance = this.URL + 'Attendance/AllAttendance';
  kanbandetails = this.URL + 'ProjectDetails/GetTaskDetails?id=';
  allProjectDetails = this.URL + 'ProjectDetails/GetAllProjectDetails?EmpId=';
  resetPassword = this.URL + 'Login/ForgotPassword?Data=';
  validateEmail = this.URL + 'Employee/ValidateEmail?data=';
  employeeListForTask = this.URL + 'ProjectDetails/GetAddedEmpToProject?id=';
  userLogin = this.URL + "Login/GetLoginDetails";
  addPeopleToProject = this.URL + 'ProjectDetails/AddEmployeeToProject?ProjId=';
  updateLeaveDetail = this.URL + 'Leave/UpdateLeaveDetails?id='
  getLeave = this.URL + 'Leave/GetLeave?data=';
  getLeaveByID = this.URL + 'Leave/GetLeaveById?id=';
  filter = this.URL + "Attendance/FilteredItems?id=";
  GetLeaveStatus = this.URL + 'Leave/GetLeaveStatus?id=';
  GetEmpDetailsForEdit = this.URL + 'Employee/getIndividualEmployeeDetailsById?id=';
  totalLeave = this.URL + "Leave/GetTotalLeave?id=";
  totalPermission = this.URL + "Leave/GetTotalPermission?id=";
  notification = this.URL + "Leave/GetNotification?id=";
  getAllLeave = this.URL + "Leave/GetAllLeave?id=";
  userAttendance=this.URL+"Attendance/UserAttendance?data="
  myAttendance=this.URL+"Attendance/MyAttendance?data="
  constructor(private http: HttpClient) { }

  public headers = new HttpHeaders({
    'content-type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  });

  allEmployeeAttendance() {
    return this.http.get(this.getOverAllAttendance)
  }

  getAttendanceDetailsById(id: any) {
    return this.http.get(this.attendanceDetails + id)
  }

  getByProjectId(id: any) {
    return this.http.get(this.updateByProjectId + id)
  }

  getEmployeeListForProjext(id: any) {
    return this.http.get(this.employeeListForTask + id)
  }

  getEmployeeName() {
    return this.http.get(this.employeeDetailsName)
  }

  userlogin() {
    return this.http.get(this.userLogin)
  }

  getLogin(params: any) {
    return this.http.post(this.dologin, params)
  }

  addUser(params: any) {
    return this.http.post(this.addUserCredentials, params)
  }

  editUser(params: any) {
    return this.http.post(this.editUserCredentials, params)
  }

  addemployeeDetails(createLogin: string, params: any, repId: number = 0) {
    return this.http.post(this.addemployeeDetail + createLogin + '&RepId=' + repId, params)
  }

  getallEmployeeDetailsWithPhoto(id: number) {
    return this.http.get(this.allEmployeeDetailsWithPhoto + id);
  }
  getallEmployeesName() {
    return this.http.get(this.GetallEmployeesName);
  }

  getUserDetails(data: any) {
    return this.http.get(this.getUser + data);
  }

  updateEmployeeDetails(paramas: any) {
    return this.http.put(this.updateEmployeeDetail, paramas);
  }

  updateProject(paramas: any) {
    return this.http.put(this.updateProjectDetails, paramas);
  }

  updateTaskDeatils(paramas: any) {
    return this.http.put(this.updateByTaskDetails, paramas);
  }

  uploadFileAttachment(params: any) {
    return this.http.post(this.uploadFile, params);
  }

  getAttachmentDetail(candidateId: any) {
    return this.http.get(this.attachmentFileDetails + candidateId);
  }

  applyLeaveOn(params: any) {
    return this.http.post(this.applyLeave, params);
  }

  updateLeaveDetails(id: any, res: any, paramas: any) {
    return this.http.put(this.updateLeaveDetail + id + '&response=' + res, paramas);
  }

  getLeaveDetails(id: any, params: any) {
    return this.http.get(this.getLeave + id + '&reportId=' + params);
  }

  addAttendance(params: any) {
    return this.http.get(this.attendance + params);
  }

  updateAttendance(id: any) {
    return this.http.get(this.updAttendance + id);
  }

  CheckAttdStatus(param: number) {
    return this.http.get(this.checkAttdStatus + param);
  }

  getAttendanceDetails(id: any) {
    return this.http.get(this.getAttendance + id);
  }

  addTaskDetails(params: any) {
    return this.http.post(this.taskDetails, params);
  }

  employeeTaskDetail(employeeId: any) {
    return this.http.get(this.getEmployeeTaskDetails + employeeId);
  }

  getAllEmployeeDetails(employeeId: any) {
    return this.http.get(this.getTeamTaskDetails + employeeId);
  }

  getTeamLeaders(params: any) {
    return this.http.get(this.getTeamLeader + params);
  }

  addProjectDetails(params: any) {
    return this.http.post(this.addProjectDetail, params);
  }

  projectDetails(params: any) {
    return this.http.get(this.getProjectDetails + params);
  }

  getprojectTaskDetails(params: any): Observable<any> {
    return this.http.get(this.getTaskDetails + params);
  }

  getEmployeeDetailsById(params: string) {
    return this.http.get(this.getEmployeeDetailById + params);
  }

  getTaskDetailById = (params: any) => {
    return this.http.get(this.getTaskDetailsById + params);
  }

  deleteUser(id: any) {
    return this.http.delete(this.deleteEmployee + id)
  }

  kanbanTaskDetails(id: any, empId?: number) {
    if (empId) return this.http.get(this.kanbandetails + id + '&EmpId=' + empId);
    return this.http.get(this.kanbandetails + id);
  }

  getAllProjectDetails(id?: number) {
    if (id) return this.http.get(this.allProjectDetails + id);
    return this.http.get(this.allProjectDetails);
  }

  ResetPassword(params: string) {
    return this.http.get(this.resetPassword + params);
  }

  ValidateEmail(params: string) {
    return this.http.get(this.validateEmail + params, { responseType: 'text' });
  }

  AddPeopleToProject(ProjId: number, EmpIds: string) {
    return this.http.get(this.addPeopleToProject + ProjId + '&EmpIds=' + EmpIds);
  }

  GetEmployeeLeave(id: any) {
    return this.http.get(this.getLeaveByID + id)
  }
  getFilter(id: any, params: any) {
    return this.http.post(this.filter + id, params)
  }
  getLeaveStatus(id: number) {
    return this.http.get(this.GetLeaveStatus + id);
  }
  getEmpDetailsForEdit(id: number) {
    return this.http.get(this.GetEmpDetailsForEdit + id)
  }
  getTotalLeave(id: any, mon: any) {
    return this.http.get(this.totalLeave + id + '&month=' + mon);
  }
  getTotalPermission(id: any, mon: any) {
    return this.http.get(this.totalPermission + id + '&month=' + mon, { responseType: 'text' });
  }
  getNotification(id: any) {
    return this.http.get(this.notification + id)
  }
  getAllLeaveDetails(id: any) {
    return this.http.get(this.getAllLeave + id)
  }

  getUserAttendance(id: any) {
    return this.http.get(this.userAttendance + id)
  }
  getMyAttendance(id: any) {
    return this.http.get(this.myAttendance + id)
  }
}
