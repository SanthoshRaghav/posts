import { useSelector } from 'react-redux';
import { selectAllPosts } from './postSlice';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

export const PostList = () => {
  const posts = useSelector(selectAllPosts);

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

  const renderPosts = orderedPosts.map((i) => (
    <article key={i.id}>
      <h3>{i.title}</h3>
      <p>{i.content.substring(0, 100)}</p>
      <p className='post-credit'>
        <PostAuthor authorId={i.userId} />
        <TimeAgo timestamp={i.date} />
      </p>
      <ReactionButtons post={i} />
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderPosts}
    </section>
  );
};
