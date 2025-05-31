import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { supabase } from '../supabase.client';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './upload.page.html',
  styleUrl: './upload.page.scss'
})
export class UploadPage {
  selectedFile?: File;
  uploadStatus = '';

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadFile() {
    if (!this.selectedFile) {
      this.uploadStatus = 'Selecciona un archivo primero.';
      return;
    }

    const filePath = `${Date.now()}_${this.selectedFile.name}`;

    const { data, error } = await supabase
      .storage
      .from('upload') // 
      .upload(filePath, this.selectedFile);

    if (error) {
      this.uploadStatus = 'Error al subir: ' + error.message;
    } else {
      this.uploadStatus = 'Archivo subido con éxito!';
    }
  }
}
