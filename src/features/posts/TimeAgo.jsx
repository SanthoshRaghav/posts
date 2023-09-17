import PropTypes from 'prop-types';

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = null;
  if (timestamp) {
    const now = new Date();
    const timeDiff = now - new Date(timestamp);
    timeAgo = Math.floor(timeDiff / (1000 * 60));
  }
  return (
    <span title='timestamp'>
      &nbsp; <i>{timeAgo} minutes ago</i>
    </span>
  );
};

TimeAgo.propTypes = {
  timestamp: PropTypes.string,
};
