# Discussions Feature - React Component

## Overview
This project has two components: `Discussions.js` and `NewDiscussion.js`. 
These components enable users to create, view, like, and dislike discussions.

## Features
- **Post New Discussion**: Users can create new discussions with a title and content.
- **View Discussions**: All discussions are displayed in a list format.
- **Like/Dislike**: Users can like or dislike discussions
- **Navigation**: Users can navigate between the discussions list and the new discussion form.

---

## File Descriptions

### `Discussions.js`
- Retrieves and displays a list of discussions .
- Users can like or dislike discussions`.
- Includes a navigation button to create a new discussion.

#### Key Functionalities:
- **`useEffect` Hook**: Loads discussions and their like/dislike counts`.
- **Like & Dislike Functions**:
  - Clicking "Like" removes a previous "Dislike" (if any) and increments the like count.
  - Clicking "Dislike" removes a previous "Like" (if any) and increments the dislike count.
- **Bootstrap UI Styling**: Uses Bootstrap classes for styling the interface.

### `NewDiscussion.js`
- Provides a form where users can enter a discussion title and content.
- Redirects users to the discussions page upon successful submission.

#### Key Functionalities:
- **`useState` Hook**: Manages form inputs for the title and content.
- **`useNavigate` Hook**: Redirects the user to the discussions page after submission.
- **Form Handling**:
  - Prevents page reload using `e.preventDefault()`.
  - Appends the new discussion to existing discussions and saves it to `localStorage`.

---

## Installation & Setup
1. Clone the repository or copy the code into your React project.
2. Ensure that React Router is installed:
   ```bash
   npm install react-router-dom
   ```
3. Import the components into your application and set up routes in `App.js`:
   ```jsx
   import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
   import Discussions from './pages/Discussions';
   import NewDiscussion from './pages/NewDiscussion';

   function App() {
       return (
           <Router>
               <Routes>
                   <Route path="/discussions" element={<Discussions />} />
                   <Route path="/new-discussion" element={<NewDiscussion />} />
               </Routes>
           </Router>
       );
   }

   export default App;
   ```
4. Start the React application:
   ```bash
   npm start
   ```

---

## Technologies Used
- **React.js**: Frontend library for building UI components.
- **Bootstrap**: For styling and responsive design.
- **React Router**: Enables navigation between pages.
- **LocalStorage**: Stores discussions, likes, and dislikes persistently.

---

## Future Enhancements
- Implement user authentication for personalized discussions.
- Improve UI with additional styling and animations.
- Allow users to edit and delete discussions.


## Credits
Developed by Kul. Some code logic was inspired by AI assistance and external documentation.
