import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './postSlice';
import { selectAllUsers } from '../users/usersSlice';

export const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [addRequestStatus, setRequestStatus] = useState('idle');

  const allAuthors = useSelector(selectAllUsers);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);
  const authorChange = (e) => setAuthorId(e.target.value);
  const canSave = [title, content, authorId].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus('pending');
        dispatch(addNewPost({ title, body: content, authorId })).unwrap();

        setTitle('');
        setContent('');
        setAuthorId('');
      } catch (err) {
        console.log(err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const authorOptions = () =>
    allAuthors.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor='postTitle'>Post Title:</label>
        <input type='text' id='postTitle' name='postTitle' value={title} onChange={handleTitle} />

        <label htmlFor='users'>Author: </label>
        <select id='users' onChange={authorChange} value={authorId}>
          <option value=''></option>
          {authorOptions()}
        </select>

        <label htmlFor='postContent'>Content:</label>
        <textarea id='postContent' name='postContent' value={content} onChange={handleContent} />

        <button type='button' onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
