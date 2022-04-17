import { DisplayController } from "./Controllers/displayController.js";
import { TodosController } from "./Controllers/TodosController.js";
import { WeatherController } from "./Controllers/WeatherController.js";


class App {
  displayController = new DisplayController();
  weatherController = new WeatherController();
  todosController = new TodosController();
}

window["app"] = new App();
