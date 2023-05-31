import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  file!: File;
  photoSelected: string | ArrayBuffer | null = null;


  constructor(private photoService: PhotoService, 
             private router: Router) { } 

  ngOnInit(): void {
  }

  onPhotoSelected(event: Event): void{
    console.log(event);

    const target = event.target as HTMLInputElement & EventTarget;

    if (target?.files && target?.files[0]){
      this.file = <File>target.files[0];
      //image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
    this.photoService.createPhoto(title.value,description.value, this.file)
    .subscribe(res =>{
      this.router.navigate(['/photos']);
    },
     err => console.log(err))

    return false;
  }

}
