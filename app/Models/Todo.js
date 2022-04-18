import { ProxyState } from "../AppState.js"

export class Todo {
  constructor(data){
    this.id = data.id || ''
    this.completed = data.completed || false
    this.description = data.description
    this.user = ProxyState.activeUser
  }
  get TodoTemplate(){
    return /*html*/ `
    <div class="form-check d-flex justify-content-between m-1" id='${this.id}'>
      <div>
        <input class="form-check-input" type="checkbox" ${this.completed ? 'checked' : ''} onclick="app.todosController.changeCompletion('${this.id}')">
        <label class="form-check-label" for="flexCheckDefault" style="${this.completed? 'text-decoration: line-through;' : ''}">${this.description}</label>
      </div>
      <div>
        <i class="mdi mdi-pencil selectable" onclick="app.todosController.rewrite('${this.id}')"></i>
        <i class="mdi mdi-delete-empty selectable" onclick="app.todosController.deleteTodo('${this.id}')"></i>
      </div>
    </div>
    `
  }
  get RewriteForm(){
    return `
    <form onsubmit="app.todosController.editTodo('${this.id}')">
      <label for="editContent" class=""visually-hidden"></label>
      <input type="text" name="editContent" id="editContent" value="${this.description}"></input>
    </form>
    `
  }
}