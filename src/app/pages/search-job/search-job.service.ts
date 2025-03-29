import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/jobs';

export interface Job {
  id?: number;
  title: string;
  company: string;
  companylogo: string;
  salary: string;
  location: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchJobService {
  private http = inject(HttpClient);
  // private localStorageService = inject(LocalStorageService);
  // private cookieService = inject(CookieService);

  constructor(
    // private http: HttpClient,
  ) {}

  // Fetch all jobs with auth header
  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(API_URL);
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(API_URL, job);
  }

  // (optional for later: updateJob(), deleteJob())

  // // Helper function to get headers with token
  // private getAuthHeaders(): HttpHeaders {
  //   const token = this.cookieService.getLocalToken(); // Assuming you store token in local storage
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  // }
  //
  // // Fetch all jobs with auth header
  // // getAllJobs(): Observable<Job[]> {
  // //   return this.http.get<Job[]>(`${API_URL}/job`, { headers: this.getAuthHeaders() });
  // // }
  //
  // getAllJobs(): Observable<Job[]> {
  //   return this.http.get<Job[]>(`${API_URL}/job`).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching jobs:', error);
  //       return of(); // Return an empty array on error
  //     })
  //   );
  // }
  //
  // fetchRelatedJobs(jobId: any): Observable<Job[]> {
  //   return this.http.get<Job[]>(`${API_URL}/job/fetchRelatedJobs/${jobId}`).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching jobs:', error);
  //       return of(); // Return an empty array on error
  //     })
  //   );
  // }
  //
  // countAllJobs(): Observable<any> {
  //   return this.http.get<any>(`${API_URL}/job/countAllJobs`).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching jobs:', error);
  //       return of(); // Return an empty array on error
  //     })
  //   );
  // }
  //
  // countAllCompanys(): Observable<any> {
  //   return this.http.get<any>(`${API_URL}/company/countAllCompanys`).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching jobs:', error);
  //       return of(); // Return an empty array on error
  //     })
  //   );
  // }
  //
  // countAllNewJobs(): Observable<any> {
  //   return this.http.get<any>(`${API_URL}/job/countAllNewJobs`).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching jobs:', error);
  //       return of(); // Return an empty array on error
  //     })
  //   );
  // }
  //
  // // // Fetch job by ID
  // // getJobById(jobId: number): Observable<Job> {
  // //   return this.http.get<Job>(`${API_URL}/job/${jobId}`, { headers: this.getAuthHeaders() });
  // // }
  //
  // getJobById(jobId: number): Observable<Job> {
  //   return this.http.get<Job>(`${API_URL}/job/${jobId}`).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching jobs:', error);
  //       return of(); // Return an empty array on error
  //     })
  //   );
  // }
  //
  // // Fetch authenticated job info
  // getMe(): Observable<Job> {
  //   return this.http.get<Job>(`${API_URL}/auth/me`, { headers: this.getAuthHeaders() });
  // }
  //
  // // Register a new job (No auth needed)
  // registerJob(job: Job): Observable<any> {
  //   return this.http.post<Job>(`${API_URL}/auth/signup`, job);
  // }
  //
  // // Login job (No auth needed)
  // loginJob(job: Job): Observable<any> {
  //   return this.http.post<Job>(`${API_URL}/auth/signin`, job);
  // }
  //
  // // Update job details
  // updateJob(jobId: number, jobData: Partial<Job>): Observable<Job> {
  //   return this.http.put<Job>(`${API_URL}/job/${jobId}`, jobData, { headers: this.getAuthHeaders() });
  //   // return this.http.get<Job>(`${API_URL}/job/${jobId}`, { headers: this.getAuthHeaders() });
  // }
  //
  // // Update job details
  // upsertJobForUserId(userId: number, jobData: Partial<Job>): Observable<Job> {
  //   return this.http.post<Job>(`${API_URL}/job/user/${userId}`, jobData, { headers: this.getAuthHeaders() });
  //   // return this.http.get<Job>(`${API_URL}/job/${jobId}`, { headers: this.getAuthHeaders() });
  // }
  //
  // // Fetch job by ID
  // getJobByUserId(jobId: number): Observable<Job> {
  //   return this.http.get<Job>(`${API_URL}/job/user/${jobId}`, { headers: this.getAuthHeaders() });
  // }
  //
  //
  // getJobsByUserId(userId: number): Observable<Job[]> {
  //   return this.http.get<Job[]>(`${API_URL}/jobs/user/${userId}`).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching jobs:', error);
  //       return of([]); // Return an empty array on error
  //     })
  //   );
  // }
  //
  // // Delete a job
  // deleteJob(jobId: number): Observable<void> {
  //   return this.http.delete<void>(`${API_URL}/delete/${jobId}`, { headers: this.getAuthHeaders() });
  // }
}
