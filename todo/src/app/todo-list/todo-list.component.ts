import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { todoModel } from './todos.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations:[
    trigger('fade',[

      transition(':enter',[
        style({ opacity:0, transform:'traslateY(30px)' }),
        animate(1000, style({ opacity:1, transform:'traslateY(0)'}))
      ]),

      transition(':leave',[
        animate(1000, style({ opacity:0, transform:'traslateY(30px)'}))
      ]),

    ])
  ]
})
export class TodoListComponent implements OnInit {
todos:todoModel[];
todoTitle:string;
idForTodo:number;
beforeEditCache:string;
filter:string;

  constructor() {
    this.filter = 'all';
    this.beforeEditCache = '';
    this.idForTodo = 4;
    this.todoTitle = '';
    
    this.todos = [
      {
        'id':1,
        'title':'Finish Angular Screncast',
        'completed':false,
        'editing':false,
      },
      {
        'id':2,
        'title':'Learn Java',
        'completed':false,
        'editing':false,

      },
      {
        'id':3,
        'title':'Break',
        'completed':false,
        'editing':false,

      },
    ];
   }

  ngOnInit(){
    
    
  }

  addTodo(){
    if (this.todoTitle.trim().length == 0) {
        return;      
    }
    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed:false,
      editing:false,

    })
    this.todoTitle = '';
    this.idForTodo++;
  }

  deleteTodo(id:number){
    this.todos = this.todos.filter(todo => todo.id != id);
  }

  editTodo(todo:todoModel){
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }
  doneEditing(todo:todoModel){
    if (todo.title.trim().length == 0) {
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;

  }
  cancelEdit(todo:todoModel){
   todo.title = this.beforeEditCache;
   todo.editing = false;

  }

  remaining():number{
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted():boolean{
    return this.todos.filter(todo => todo.completed).length > 0;

  }

  clearCompleted(){
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkalltodos(){
    this.todos
  }

  todosFilter():todoModel[]{
    if (this.filter =='all') {
      return this.todos
    }
    if (this.filter == 'active') {
      return this.todos.filter(todo => !todo.completed)      
    }
    if (this.filter = 'completed') {
      return this.todos.filter(todo => todo.completed)      
    }
    return this.todos
  }
}
