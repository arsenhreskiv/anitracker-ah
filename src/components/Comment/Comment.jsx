import React from 'react';

export default function Comment({ content }) {
  return (
    <div className="comment">
      <p>{content}</p>
    </div>
  );
}