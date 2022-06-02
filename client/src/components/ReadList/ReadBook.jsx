import React from 'react';

const ReadBook = (props) => {
  const { readBook } = props;

  return (
    <div>
      {readBook.title}
      {readBook.author}
      <img alt="" src={readBook.coverURL} />
    </div>
  );
};

export default ReadBook;
