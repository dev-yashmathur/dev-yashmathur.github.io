
# React Bookshelf

This project is a component for adding custom books to your react bookshelf element, allowing users to create personal bookshelves or randomly generated ones for asthetic purposes.


## Features

- Create custom or randomly generated bookshlves
- Ability to color, design, and apply orientation to given books
- Comes with built in Themes and allows for custom appearance
- Books can be displayed as normal (side by side) or in stacks and on display (cover facing)


## Usage/Examples ()
### Creating BookShelf

```javascript
import { BookShelf, Book } from "./components";

function App() {
  return(
    <BookShelf>
      <Book/>
    </BookShelf>
  );
}
```

### Creating BookStack

```javascript
import { BookStack, BookStackElement } from "./components";

function App() {
  return(
    <BookShelf>
      <BookStack>
        <BookStackElement/>
      </BookStack>
    </BookShelf>
  );
}
```

### Adding Titles

```javascript
import { BookStack, BookStackElement } from "./components";

function App() {
  return(
    <BookShelf>
      <Book title={"Title of Book"} subtitle={"Subtitle of Book"}/>
    </BookShelf>
  );
}
```


### Adding Color

```javascript
import { BookStack, BookStackElement } from "./components";

function App() {
  return(
    <BookShelf>
      <Book color={"cyan"}/>
    </BookShelf>
  );
}
```
## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Green | ![#00B600](https://via.placeholder.com/10/00b600?text=+) #00B600 |
| Blue | ![#0C347D](https://via.placeholder.com/10/0C347D?text=+) #0C347D |
| Umber | ![#54290C](https://via.placeholder.com/10/54290C?text=+) #54290C |
| Springer | ![#F2E323](https://via.placeholder.com/10/F2E323?text=+) #F2E323 |
| Maroon | ![#800000](https://via.placeholder.com/10/800000?text=+) #800000 |
| Pink | ![#CE84F7](https://via.placeholder.com/10/CE84F7?text=+) #CE84F7|
| Cyan | ![#025D57](https://via.placeholder.com/10/025D57?text=+) #025D57 |
| Purple | ![#5F184E](https://via.placeholder.com/10/5F184E?text=+) #5F184E |


## Demo

https://codesandbox.io/p/github/Jake-Leicht/react-bookshelf/master?workspaceId=2d3e4703-5c8d-48f1-b68c-4d3f8f609955


## Installation

### Download project

Go to https://github.com/Jake-Leicht/react-bookshelf and download the zip file with code.

### Clone repo into project

```bash
  git clone https://github.com/Jake-Leicht/react-bookshelf.git
```
    
## Roadmap
- Adjustable heights for books
- Make random title generator
- Pixel perfect design
- Error handling improvments
- Adjustable widths/heights in BookStack components


## Authors

- [@Jake-Leicht](https://github.com/Jake-Leicht)


## FAQ


#### Was this built with TypeScript?

Yes.

#### What dependencies are needed?

You will need to install styled-components.

```
    npm install styled-components
    npm install sass
```

