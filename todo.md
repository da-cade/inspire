
Requirements = []
Stretch = {}

[x] Quote: A quote is displayed, and the author is revealed on hover
    {x}: Add a button to generate a new quote (on-hover)
[x] Weather: The temperature is displayed in Fahrenheit/Celsius with a toggle
    {x}: Display Kelvin as well
    {}: Include an icon with the weather (not witchy NOTE Are there different types of weather icons that share a code?)
[x] Todo: Todo's are rendered on reload
[x] Todo: Todo's values can be updated and do not refresh page
[x] Todo: Todo's can be added (.Post)
[x] Todo: Todo's can be deleted (.delete)
[x] Todo: Deleting a todo prompts for confirmation
[x] Todo: Todo's can be marked complete (.put)
[x] Todo: Completed todo's have a checkbox or style indication or both
[x] Image: An image is taken from the API
    {x}: Add a button to get a new picture (on-hover)
[x] Image: Image must be a background image on body
    {x}: Display: Allow the user to set their name and save to LocalStorage
    {}: Display: Change the greeying message to the appropriate period, morning, afternoon, evening, night, witching hour
[x] Date: A clock shows the accurate time in the middle of the screen and TODO updates appropriately
    {x}: Time/Display: Allow user to change the clock to military

{}: Display: Allow User to change the theme.
{}: Todo: REVIEW "You might find a way to optimize the list by only updating the one to-do that changes at a time"
{x}: Every time you update a todo, "you shouldn't have to re-.get the entire list. You already know what changed about the one todo."
{}: Save quotes

Steps: 

1. Format

  Format html

2. Data

Image
1. Set up AxiosService and connect to Api. Test res
2. Format CSS
3. Create imageController, imageService. Or, just one sandBox service and  
   one task service?
   {We want an image service for the image cycle button}
4. Pass the image from the controller to the service, create renderImage()
5. Find an image and apply it to the background using document.elem.style

DateTime
1. Find dateTime method, get an object in the controllerand apply it's 
   values to a controller template. (service not necessary)
2. ensure that the display updates every second. setInterval(getDateTime?)?

Weather
1. Set up a WeatherService, get from sandbox. log res
    --draw to page preliminary
2. Convert temperature, add function to draw as Kelvin, Cel, or Fh
3. REVIEW Get icon (value provided, but actual image is at... ?)
4. set up a controller that .gets? the weather at least once every hour
5. draw to the page (but do this after step 2), listener

Quote
1. Set up a QuoteService, get from the sandbox {}
2. place quote and author onto page with draw, add a cycle icon as button 
   for .quoteSerivce.getQuote().
3. Author name on-hover

Todos
1. 