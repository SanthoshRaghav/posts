import PropTypes from 'prop-types';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

export const PostsExcerpt = ({ i }) => {
  return (
    <article>
      <h3>{i.title}</h3>
      <p>{i.body.substring(0, 100)}</p>
      <p className='post-credit'>
        <PostAuthor authorId={i.userId} />
        <TimeAgo timestamp={i.date} />
      </p>
      <ReactionButtons post={i} />
    </article>
  );
};

PostsExcerpt.propTypes = {
  i: PropTypes.object,
};
