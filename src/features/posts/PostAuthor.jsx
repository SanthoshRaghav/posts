import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice';

export const PostAuthor = ({ authorId }) => {
  const authors = useSelector(selectAllUsers);
  const author = authors.find((author) => author.id === authorId);
  return <span>by {author ? author.name : 'Unknow author'}</span>;
};

PostAuthor.propTypes = {
  authorId: PropTypes.number,
};
