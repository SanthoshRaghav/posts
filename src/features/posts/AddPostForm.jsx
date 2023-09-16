import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from './postSlice';

export const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content));
      setTitle('');
      setContent('');
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor='postTitle'>Post Title:</label>
        <input type='text' id='postTitle' name='postTitle' value={title} onChange={handleTitle} />

        <label htmlFor='postContent'>Content:</label>
        <textarea id='postContent' name='postContent' value={content} onChange={handleContent} />

        <button type='button' onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
};