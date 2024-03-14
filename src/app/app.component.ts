import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'CapiLog_Test';

  //Données API
  operationData: any;
  showResult: boolean = false;
  isCorrect: boolean = false;

  //Données
  userAnswer!: number;
  correctAnswer!: number;
  correctAnswerNumber: number = 0;
  totalAnswerNumber: number = 0;

  time: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getOperationData();

    setInterval(() => {
      this.time++; 
      }, 1000);
  }

  getOperationData() {
    this.http.get<any>("http://localhost:8000/backend.php").subscribe(data => {
      this.operationData = data;
    });
  }

  submitAnswer() {
    const postData = {
      N1: this.operationData.N1,
      N2: this.operationData.N2,
      Sign: this.operationData.Sign,
      UserAnswer: this.userAnswer
    };

    this.http.post<any>("http://localhost:8000/backend.php", postData).subscribe(response => {
      this.showResult = true;
      this.isCorrect = response.isCorrect;
      this.correctAnswer = response.correctAnswer;

      if (this.isCorrect) this.correctAnswerNumber++;
      this.totalAnswerNumber++;

      this.getOperationData();
    });
  }
}
