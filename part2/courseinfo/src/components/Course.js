import React from 'react';

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Part = ({ id, name, exercises }) => {
  return (
    <li key={id}>
      {name} <strong>{exercises}</strong>
    </li>
  );
};

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </ul>
  );
};

const Footer = ({ parts }) => {
  const total = parts.reduce(function (acc, obj) {
    return acc + obj.exercises;
  }, 0);
  return (
    <div>
      Total of <strong>{total}</strong> exercises
    </div>
  );
};

const Course = ({ course }) => {
  const { id, name, parts } = course;
  return (
    <div key={id}>
      <Header title={name} />
      <Content parts={parts} />
      <Footer parts={parts} />
    </div>
  );
};

export default Course;
