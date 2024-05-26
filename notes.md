## Part 0
- impt rule: always keep console open 

## Part 1
- npm create vite@latest part1 -- --template react

- after creation of react app:
    1. delete assets (inside src)
    2. delete App.css
    3. delete index.css
    4. edit main.jsx to 

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)   
```

- format for component

```jsx
const Content = (props) => {
    return (
        <>
            ...
        </>
    )
}

export default Content
```

- after defining component, rmb to add the following code block to your App.jsx file

```jsx
import Content from './Content';
``` 

## Part 2
- To install a JSON server globally on your device
```javascript
npm install -g json-server
```

- To run a JSON server globally on your device
```javascript
json-server --port 3001 --watch db.json
```

- To install and run a JSON server locally 
1. create a db.json file in root directory
2. type the following into the terminal to run the JSON server locally
```javascript
npx json-server --port 3001 --watch db.json
```
3. navigate to http://localhost:3001/notes in browser to see the db

- using axios
1. npm install axios
2. npm install json-server --save-dev
3. (add to scripts) "server": "json-server -p3001 --watch db.json"
4. npm run server

- import statements
import countryService from './services/countries' 

    - the './' indicates the current directory
    - '../' indicates moving up one level from your current directory

- setting up a server
    1. npm init
    2. create index.js file (put a conosle.log inside)
    3. npm install express 
    4. install nodemon (npm install --save-dev nodemon)
    5. add ("dev": "nodemon index.js",) to scripts
    5. npm run dev 

- if want to send POST requests
    (on postman): body -> raw -> set text to JSON 



- connecting the frontend to the backend
    1. in frontend, change url to same path as backend server
    2. in backend repo, npm install cors
    3. in backend repo, add middleware
    ```javascript
    const cors = require('cors')

    app.use(cors())
    ```
    4. 

- after connecting backend and deploying (useing fly.io), after any changes just run (fly deploy)