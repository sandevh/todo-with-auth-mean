import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";

type Todo = { _id: string; task: string; done?: boolean;};

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTask = '';
  errorText = '';
  @ViewChild('errorRef') errorRef!: ElementRef<HTMLDivElement>;
  userName = '';

  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTodos();

    const rawName = this.authService.getUserName();
    this.userName = rawName
      .split(' ')
      .map(
        (word: string) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(' ');
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos: any) => {
      this.todos = todos;
    });
  }

  onAddTodo() {
    if (this.newTask.trim()) {
      this.todoService.addTodo(this.newTask).subscribe(() => {
        this.newTask = '';
        this.loadTodos();
      });
    } else {
      this.errorRef.nativeElement.textContent =
        'Task and Date cannot be empty!';
    }
  }

  clearError() {
    this.errorRef.nativeElement.textContent = '';
  }

  onClickTodo(todo: Todo) {
    todo.done = !todo.done;
    this.todoService.updateTodo(todo._id, { done: todo.done }).subscribe();
  }

  onDeleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
