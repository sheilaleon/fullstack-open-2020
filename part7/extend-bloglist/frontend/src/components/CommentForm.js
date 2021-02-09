import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CommentForm = ({ id, addComment }) => {
  const [comments, setComments] = useState('');

  const handleComment = async (e) => {
    e.preventDefault();

    addComment(id, { comments });
    setComments('');
  };

  return (
    <Form.Group onSubmit={handleComment}>
      <Form.Control
        name="comment"
        value={comments}
        type="text"
        onChange={({ target }) => setComments(target.value)}
      />
      <Button className="btn secondary">Add Comment</Button>
    </Form.Group>
  );
};

export default CommentForm;
