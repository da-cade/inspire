import { ProxyState } from "../AppState.js"
import { todosService } from "../Services/TodosService.js"
import { Pop } from "../Utils/Pop.js"

function _drawTodos() {
  let remaining = ProxyState.todos.filter(t => t.completed).length
  let count = ProxyState.todos.length
  const todosToDraw = ProxyState.todos.filter(t => t.user == ProxyState.activeUser)
  let template = ''
  //TODO *.sort((a,b) => a.completed)*/
  todosToDraw.forEach(t => template += t.TodoTemplate)
  document.getElementById('todo-landing').innerHTML = template
  if(ProxyState.todos.length >= 1){
    document.getElementById('remaining').innerText = remaining.toString()
    document.getElementById('total').innerText = '/'+count.toString()
  }
}
function _rewrite(id) {
  const todo = ProxyState.todos.find(t => t.id == id)
  document.getElementById(todo.id).innerHTML = todo.RewriteForm
}

export class TodosController {
  constructor(){
    ProxyState.on('todos', _drawTodos)
    ProxyState.on('activeUser', _drawTodos)
    this.getTodos()
  }
  async getTodos() {
    try {
      await todosService.getTodos()
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }
  async addTodo(){
    try {
      event.preventDefault()
      const formElem = event.target
      const formData = {
        completed: false,
        // @ts-ignore
        user: ProxyState.activeUser || '',
        // @ts-ignore
        description: formElem.description.value
      }
      await todosService.addTodo(formData)
      // @ts-ignore
      formElem.reset()
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }
  async changeCompletion(id){
    try {
      await todosService.changeCompletion(id)
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }
  tallyTodos(){
    
  }
  rewrite(id){
    _rewrite(id)
  }
  async editTodo(id){
    try {
      debugger
      event.preventDefault()
      let formElem = event.target
      let formData = {
        description: formElem.editContent.value,
        id: id
      }
      // _drawTodos()
      await todosService.editTodo(formData)
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }
  async deleteTodo(id){
    try {
      if(await Pop.confirm('Delete this item?', "this can't be undone", 'warning', "delort")){
        await todosService.deleteTodo(id)
      }
    } catch (error) {
      console.error(error)
      Pop.toast(error.message, 'error')
    }
  }
}

