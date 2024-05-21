Save button is clicked
    - POST request containing content of the form is sent from the browser to the server (url is /new_note)
    - server processes the POST request, creates a new note and sends back a response to browser (status code = 302 for url_redirect)
    - browser receives request, sends GET request as indicated by the response by server
    - browser sends HTTP GET https.../notes to server
    - server receives HTTP GET request, sends back a HTML file
    - same thing is done for CSS and JS file
    - upon reaching the script tag, browser sends HTTP GET to server for JSON data
    - server sends response to browser containing data.json content
    - upon a GET request to data.json file is sent to server,eventHandler is called

User goes to the single-page app
    - GET request for HTML file sent to server, server sends HTML file
    - same thing for CSS and JS file
    - browser executes js code, once it reaches eventHandler, new notes are rendered to the display

User clicks on save button
    - HTTP POST request is sent from the browser to the server (url .../new_note_spa)
    - browser appends note inside the payload
    - server sends new note to browser