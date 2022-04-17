import { ProxyState } from "../AppState.js"
import { todosService } from "../Services/TodosService.js"
import { Pop } from "../Utils/Pop.js"

function _drawTodos() {
  let template = ''
  let todos = (ProxyState.todos) //TODO *.sort((a,b) => a.completed)*/
  todos.forEach(t => template += t.TodoTemplate)
  document.getElementById('todo-landing').innerHTML = template
}

export class TodosController {
  constructor(){
    ProxyState.on('todos', _drawTodos)
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
        user: ProxyState.activeUser.username || '',
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
  async editTodo(id){
    try {
      await todosService.editTodo(id)
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

