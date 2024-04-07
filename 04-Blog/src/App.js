import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from "./app/Navbar";
import AddPost from './features/posts/AddPost';
import PostPage from './features/posts/PostPage';
import PostsList from './features/posts/PostsList';
import UserPage from './features/users/UserPage';
import UsersList from './features/users/UsersList';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route path="/" exact>
              <AddPost />
              <PostsList />
            </Route>
            <Route path="/users" exact>
              <UsersList />
            </Route>
            <Route path="/users/:userId" exact>
              <UserPage />
            </Route>
            <Route path="/posts/:postId" exact>
              <PostPage />
            </Route>
          </Switch>

        </div>
      </Router>
    </>
  );
}

export default App;
