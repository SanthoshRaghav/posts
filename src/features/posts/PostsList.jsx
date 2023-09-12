import { useSelector } from 'react-redux';
import { selectAllPosts } from './postSlice';

export const PostList = () => {
  const posts = useSelector(selectAllPosts);

  return (
    <section>
      <h2>Posts</h2>
      {posts.map((i) => (
        <article key={i.id}>
          <h3>{i.title}</h3>
          <p>{i.content.substring(0, 100)}</p>
        </article>
      ))}
    </section>
  );
};
