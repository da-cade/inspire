import { ProxyState } from "../AppState.js";
import { Todo } from "../Models/Todo.js";
import { saveState } from "../Utils/LocalStorage.js";
import { sandboxApi } from "./AxiosService.js";

class TodosService {
  async addTodo(formData) {
    const res = await sandboxApi.post('dylan/todos/', formData)
    const newTodo = new Todo(res.data)
    ProxyState.todos = [newTodo, ...ProxyState.todos]
    console.log(ProxyState.activeUser)
  }
  async getTodos() {
    const res = await sandboxApi.get('dylan/todos')
    ProxyState.todos = res.data.map(t => new Todo(t))
  }
  async changeCompletion(id) {
    const todo = ProxyState.todos.find(t => t.id === id)
    if(!todo){
      throw new Error("Couldn't find that to-do, chum.")
    }
    todo.completed = !todo.completed
    await sandboxApi.put('dylan/todos/' + id, todo)
    ProxyState.todos = ProxyState.todos
  }
  async editTodo(formData) {
    const todo = ProxyState.todos.find(t => t.id === formData.id)
    const index = ProxyState.todos.findIndex(t => t.id == formData.id)
    console.log(ProxyState.todos[index])
    todo.description = formData.description
    const res = await sandboxApi.put('dylan/todos/' + formData.id, todo)
    const newTodo = new Todo(res.data)
    ProxyState.todos.splice(index, 1, newTodo)
    ProxyState.todos = ProxyState.todos
  }
  
  async deleteTodo(id) {
    const index = ProxyState.todos.findIndex(t => id === t.id)
    await sandboxApi.delete('dylan/todos/' + id)
    ProxyState.todos = ProxyState.todos.filter(t => t.id !== id)
  }
}

export const todosService = new TodosService();