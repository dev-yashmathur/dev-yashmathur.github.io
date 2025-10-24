import { BookShelf, Book, BookStack, BookStackElement } from "./components";

/*
  * original design influenced by Kevin (codepen: https://codepen.io/kzf/pen/vEYVmL)

  ? Themes: default(none), beige, night owl, shades of purple, gruvbox, vue, barbie, {CUSTOM}
  ~ Colors: green(default), blue, umber, springer, maroon, pink, cyan, purple, #HEX
  ^ Design: no bands(default), split band, dual top bands, colored spine
  & Orientation: default, tilted, onDisplay
*/

function App() {
  return (
    <BookShelf>
      <Book title={"Hello World"} color={"purple"} width={1120} design={"colored spine"}/>
      <Book title={"White Space"} width={700} design={"split bands"} color={"pink"}/>
      <Book title={"The Art of Computer Programming Vol 1"} width={1156} design={"dual top bands"} color={"cyan"}/>
      <Book title={"Cascading Style Sheets"} subtitle={"Guide to Design"} width={560} orientation={"tilted"}/>
      <Book title={"HTML5"} subtitle={"Welcome to the Web"} width={1350} design={"colored spine"}/>
      <BookStack>
        <BookStackElement title={"Coding for Dummies"} subtitle={"JS tutorial"} color={"blue"} design={"colored spine"}/>
        <BookStackElement title={"Coding for Dummies"} subtitle={"C# tutorial"} color={"pink"} design={"dual top bands"}/>
      </BookStack>
      <Book title={"CoffeeScript"} subtitle={"The JS Alternative"} author={"The Dev Guy"} design={"split bands"} color={"#bbff33"} orientation={"onDisplay"}/>
      <Book title={"Cheat Sheet"} subtitle={"Guide to Design"} color={"blue"} design={"split bands"} width={870}/>
      <Book title={"Psychology of Colors"} color={"pink"} design={"dual top bands"} width={540}/>
      <Book title={"TypeScript"} subtitle={"Intro JS to type checking"} color={"cyan"} design={"colored spine"} width={1130}/>
      <Book title={"Testing"} width={10}/>
      <Book title={"JavaScript"} subtitle={"The Definitive Guide"} author={"David Flanagan"} design={"split bands"} color={"purple"} orientation={"onDisplay"}/>
      <Book title={"Pragmatic Programmer"} color={"maroon"}/>
      <Book title={"White Space"} color={"#FFF"} design={"split bands"}/>
      <Book title={"W3 Schools"} subtitle={"The best around"} color={"blue"} design={"split bands"} orientation={"tilted"}/>
      <Book title={"UI/UX"} subtitle={"Guide to Mobile Development"} author={"John Doe"} color={"springer"} orientation={"onDisplay"} design={"dual top bands"}/>
      <Book title={"Clean Code"} color={"maroon"} orientation={"tilted"} design={"dual top bands"}/>
      <Book title={"Docs for Devs"}/>
      <BookStack stackDesign={"dual top bands"}>
        <BookStackElement title={"The Art of Computer Programming Vol 1"} color={"green"} design={"no bands"}/>
        <BookStackElement title={"The Art of Computer Programming Vol 2"} color={"maroon"} design={"colored spine"}/>
        <BookStackElement title={"The Art of Computer Programming Vol 3"} color={"blue"} design={"split bands"}/>
        <BookStackElement title={"The Art of Computer Programming Vol 4a"} color={"pink"} design={"dual top bands"}/>
      </BookStack>
    </BookShelf>
  );
}

export default App;
