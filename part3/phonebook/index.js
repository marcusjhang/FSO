const express = require("express");
const app = express();
const morgan = require('morgan')
const cors = require('cors')

// Create a custom token to log the request body
morgan.token("body", (req) => JSON.stringify(req.body)); // it takes the req and returns a stringified version of the body

// Define a custom format that includes the request body
const customFormat = ':method :url :status :res[content-length] - :response-time ms :body'; // :body refers to the custom token defined right above

app.use(morgan(customFormat)); 
app.use(express.json());
app.use(cors())
app.use(express.static('dist')) // now whenever a GET request is made to the server, the server will first check if the request is for a static file. If it is, the file will be returned to the client. If it is not, the request will be passed on to the next middleware.

persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${
      persons.length
    } people</p> <br /> <p>${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id); 
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}

app.post("/api/persons", (request, response) => {
  const body = request.body; // note that all of these are only possible because we did app.use(express.json()) earlier, allowing us to parse requests

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const existingPerson = persons.find((person) => person.name === body.name);
  if (existingPerson) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
