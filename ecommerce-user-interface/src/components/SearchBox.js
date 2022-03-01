import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  console.log(keyword);
  const submitHandler = e => {
    e.preventDefault();
    if (keyword.trim()) {
      // Trimming all white spaces
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      style={{ display: 'grid', gridTemplateColumns: '3fr 1.2fr' }}
    >
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
