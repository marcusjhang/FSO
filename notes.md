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

