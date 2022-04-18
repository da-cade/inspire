
When handling our api data, find out which tasks need to be models.

Tasks at the very least.
"The only service that requires more than a .get is TodoService"

This project is less complicated than I anticipated. We're only working with one API. On reflection, I didn't need to pass the objects back through until I started working with them. For example, when bringing in a pojo from the bcwSandbox, I could have simply rendered an green square to the page with an onclick that takes that object and performs a put on it, changing the bool and then bringing back the object when the bool is flipped making it possible to Instantiate it.

Basic plan. 
Get image from Api, set it as background image.
- ImageService, ImageController, constructor
Create ToDo list
- Here we are only applying a .put on add, and a .get function eventually on the constructor. To begin with, we'll want to use pseudodata.
- We'll also need a listener on the local state to draw new adds.


AppState - {
  ActiveImage = 
  ActiveQuote = 
  ActiveWeather = 
  todos = []
}

Controllers
displayController - {
  Listener on image,
  Listener on quote,
  drawImage,
  cycleImage,
  drawQuote,
  cycleQuote,
  witchTheme,
  spaceTheme,
  baseTheme
}
weatherController - {
  Listener on temperature, .get every 30 min?
  draw (location, coordinates),
  calculate ,
  setFormat ,
}
todosController - {
  No one else is editing these, therefore:
    Listener on todos, _drawTodos
  drawTodos,
  getAllTodos(service)
  addTodo(service)
  deleteTodo(service)
  changeCompletion(service)
}

Services
displayService - {
  image: ,
  quote: ,
  page_theme:
}
weatherService - {
  weather items
}
todosService - {
  getAllTodos,
  addTodo,
  deleteTodo,
  changeCompletion (.put) (local reassignment triggers draw, database is uploaded),
}


Models
Anything we want more than one template for, probably should be a class (but not necessarily)
Todo.js {
  completed,
  description,
  user
}


Themes:
s
🔭📷 Ansel

👁‍🗨🔮 Alistair 

👓🪑 Aalto - base?

Aldrin?



NOTE Important Reflections -

💫 If we want to change the whole page on the basis of theme, will the whole model need to be live html?
  - Look into REVIEW the multiple views model?
  - I created a UsernameForm.js incase it needs to be injected into different places.
💫 I had a thought about scaleable design... HOW to write this program such that it accomodates scaling?
💫 Separate components & encapsulation of like tasks... this is open to interpretation. Like functions or like data?

Design:
💫 I want a display controller that works both the image and the quote, as well as any theme adjustments that take place.
💫 Different themes would display different kinds of information