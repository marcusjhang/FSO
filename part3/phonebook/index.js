const express = require("express");
const app = express();
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

// Create a custom token to log the request body
morgan.token("body", (req) => JSON.stringify(req.body)); // it takes the req and returns a stringified version of the body

// Define a custom format that includes the request body
const customFormat = ':method :url :status :res[content-length] - :response-time ms :body'; // :body refers to the custom token defined right above

app.use(morgan(customFormat)); 
app.use(express.json());
app.use(cors())
app.use(express.static('dist')) // now whenever a GET request is made to the server, the server will first check if the request is for a static file. If it is, the file will be returned to the client. If it is not, the request will be passed on to the next middleware.

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => { 
  Person.find({})
    .then(persons => {
      response.json(persons);
    })
    .catch(error => next(error));
});

app.get("/info", (request, response) => { 
  Person.countDocuments({})
    .then(count => {
      response.send(
        `<p>Phonebook has info for ${count} people</p> <br /> <p>${new Date()}</p>`
      );
    })
    .catch(error => next(error));
});

app.get("/api/persons/:id", (request, response) => { 
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

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

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson);
  })
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
