import { PostList } from './features/posts/PostsList';
import { AddPostForm } from './features/posts/AddPostForm';
import './App.css';

function App() {
  return (
    <main>
      <AddPostForm />
      <PostList />
    </main>
  );
}

export default App;
