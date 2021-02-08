import React, { useState } from 'react';

const CommentForm = ({ id, addComment }) => {
  const [comments, setComments] = useState('');

  const handleComment = async (e) => {
    e.preventDefault();

    addComment(id, { comments });
    setComments('');
  };

  return (
    <form onSubmit={handleComment}>
      <div>
        <input
          name="comment"
          value={comments}
          type="text"
          onChange={({ target }) => setComments(target.value)}
        />
        <button className="btn secondary">Add Comment</button>
      </div>
    </form>
  );
};

export default CommentForm;
