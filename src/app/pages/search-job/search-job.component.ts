import { Component, OnInit, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownComponent } from '../../elements/dropdown/dropdown.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchJobService, Job } from './search-job.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-search-job',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    DropdownComponent,
    HttpClientModule,
    FormsModule
  ],
  providers: [SearchJobService],
  templateUrl: './search-job.component.html',
  styleUrl: './search-job.component.css'
})
export class SearchJobComponent implements OnInit {
  // List of all job entries fetched from the backend
  jobs: Job[] = [];

  // Selected job for creating or editing
  selectedJob: Job = {
    id: 0,
    title: '',
    company: '',
    companylogo: '',
    salary: 0,
    location: '',
    url: ''
  };

  // Dropdown filter options
  dropdown_item = {
    select: 'Newest',
    value: ['Newest', 'Latest', 'Oldest'],
    image: ['assets/images/svg/arrow-down-short.svg']
  };

  constructor(
    private searchJobService: SearchJobService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadJobs(); // Load jobs on component init
  }

  // Fetch all jobs from the backend
  loadJobs() {
    this.searchJobService.getAllJobs().subscribe({
      next: (jobs) => {
        // Repeat logos from 1.svg to 5.svg
        const logoCount = 5;
        this.jobs = jobs.map((job, index) => ({
          ...job,
        }));
      },
      error: (err) => {
        console.error('Error loading jobs:', err);
      }
    });
  }  

  // Open modal for creating a new job
  openCenter(content: TemplateRef<any>) {
    // Reset form
    this.selectedJob = {
      id: 0,
      title: '',
      company: '',
      companylogo: '',
      salary: 0,
      location: '',
      url: ''
    };
    this.modalService.open(content, { centered: true });
  }

  // Create or update a job based on presence of ID, and only if form is valid
  saveJob(form: NgForm) {
    if (!form || !form.valid) {
      console.warn('Form is invalid.');
      return;
    }
  
    if (this.selectedJob.id && this.selectedJob.id !== 0) {
      // Update existing job
      this.searchJobService.updateJob(this.selectedJob.id, this.selectedJob).subscribe({
        next: (updatedJob) => {
          const index = this.jobs.findIndex(job => job.id === updatedJob.id);
          if (index !== -1) this.jobs[index] = updatedJob;
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error updating job:', err)
      });
    } else {
      // Create new job
      const { id, ...jobWithoutId } = this.selectedJob;
      this.searchJobService.createJob(jobWithoutId as Omit<Job, 'id'>).subscribe({
        next: (createdJob) => {
          this.jobs.unshift(createdJob);
          this.modalService.dismissAll();
        },
        error: (err) => console.error('Error creating job:', err)
      });
    }
  }  

  // Open modal with job pre-filled for editing
  editJob(job: Job, content: TemplateRef<any>) {
    console.log('Editing job:', job);
    this.selectedJob = { ...job };
    this.modalService.open(content, { centered: true });
  }

  // Delete a job by ID
  deleteJob(id: number | undefined) {
    console.log('Attempting to delete job ID:', id);
    if (!id) return;

    if (confirm('Are you sure you want to delete this job?')) {
      this.searchJobService.deleteJob(id).subscribe({
        next: () => {
          console.log('Job deleted:', id);
          this.jobs = this.jobs.filter(job => job.id !== id);
        },
        error: (err) => {
          console.error('Error deleting job:', err);
        }
      });
    }
  }

  // For optimizing *ngFor rendering
  trackByJobId(index: number, job: Job): number {
    return job.id!;
  }
  
  sanitizeInput<K extends keyof Job>(event: Event, fieldName: K, regexPattern: string, control: any) {
    const input = event.target as HTMLInputElement;
    const regex = new RegExp(regexPattern);
    
    // Allow the user to type anything, but check for invalid characters
    if (!regex.test(input.value)) {
      control.control.setErrors({ invalidCharacter: true });
    } else {
      control.control.setErrors(null);
    }
  
    // Update the model (do not remove invalid characters)
    this.selectedJob = {
      ...this.selectedJob,
      [fieldName]: fieldName === 'salary' ? parseInt(input.value) || 0 : input.value
    };
  
    control.control.markAsTouched();
    control.control.updateValueAndValidity();
  }
  

  validateNumber(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (allowedKeys.includes(event.key)) {
      return;
    }
    
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  getCompanyLogo(): string {
    return this.selectedJob.companylogo && this.selectedJob.companylogo.trim() !== ''
      ? this.selectedJob.companylogo
      : 'assets/images/default-logo.svg';
  }  
  
}
