
export class Todo {
  constructor(data){
    this.id = data.id || ''
    this.completed = data.completed || false
    this.description = data.description
    this.user = data.user || ''
  }
  get TodoTemplate(){
    return /*html*/ `
    <div class="form-check d-flex justify-content-between m-1">
      <div>
        <input class="form-check-input" type="checkbox" id='${this.description.split(' ').join('-')}'${this.completed ? 'checked' : ''} onclick="app.todosController.changeCompletion('${this.id}')">
        <label class="form-check-label" for="flexCheckDefault" style="${this.completed? 'text-decoration: line-through;' : ''}">${this.description}</label>
      </div>
      <div>
        <i class="mdi mdi-pencil selectable" onclick="app.todosController.editTodo('${this.id}')"></i>
        <i class="mdi mdi-delete-empty selectable" onclick="app.todosController.deleteTodo('${this.id}')"></i>
      </div>
    </div>
    `
  }
}