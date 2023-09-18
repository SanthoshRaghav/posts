import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { reactionAdded } from './postSlice';

const reactionEmoji = {
  thumbsup: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕',
};

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const buttons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button key={name} className='reactionButton' onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name }))}>
      {emoji}
      {post.reactions[name]}
    </button>
  ));

  return <div>{buttons}</div>;
};

ReactionButtons.propTypes = {
  post: PropTypes.object,
};
