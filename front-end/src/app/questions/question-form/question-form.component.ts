import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Question } from 'src/models/question.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  public questionForm: FormGroup;
  id : string
  nbAnswer =0;
  alert = false;

  constructor(private route: ActivatedRoute, public router : Router,
              public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      indice:[''],
      answers: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: '',
      image: '',
      isCorrect: false,
    });
  }

  addAnswer() {
    if(this.nbAnswer <3){
      this.nbAnswer ++;
      this.answers.push(this.createAnswer());}
    else{
      this.alert = true;
    }
  }

  addQuestion() {
    if(this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      this.quizService.addQuestion(this.id, question);
      this.initializeQuestionForm();
      this.router.navigateByUrl('/edit-quiz/'+this.id)
    }
  }
}
