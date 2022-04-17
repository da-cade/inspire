import { ProxyState } from "../AppState.js";
import { Todo } from "../Models/Todo.js";
import { sandboxApi } from "./AxiosService.js";

class TodosService {
  async addTodo(formData) {
    const res = await sandboxApi.post('dylan/todos/', formData)
    const newTodo = new Todo(res.data)
    ProxyState.todos = [newTodo, ...ProxyState.todos]
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
    // REVIEW didn't need to use reassignment??
  }
  async editTodo(id) {
    const todo = ProxyState.todos.find(t => t.id === id)
    // figure out a way to make a live update
    const res = await sandboxApi.put('dylan/todos/' + id, todo)
    console.log(res.data)
  }
  
  async deleteTodo(id) {
    const index = ProxyState.todos.findIndex(t => id === t.id)
    await sandboxApi.delete('dylan/todos/' + id)
    ProxyState.todos = ProxyState.todos.filter(t => t.id !== id)
  }
}

export const todosService = new TodosService();