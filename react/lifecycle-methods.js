/*
React Component Lifecycle Methods:

1. Mounting
Mounting happens when a component is created and inserted into the DOM.

constructor() // defining states
     ↓
render() // rendering the html
     ↓
componentDidMount() // API calls, Event listeners, Timers, DOM operations

2. Updating
Updating occurs when props or state change.

New props / setState()
       ↓
shouldComponentUpdate()
       ↓
render()
       ↓
componentDidUpdate()

3. Unmounting
Unmounting happens when the component is removed from the DOM. It's mainly used for cleanup.
*/
