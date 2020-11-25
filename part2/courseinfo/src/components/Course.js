import React from 'react';

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Part = ({ id, name, exercises }) => {
  return (
    <li key={id}>
      {name} {exercises}
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

const Course = ({ course }) => {
  const { id, name, parts } = course;
  return (
    <div key={id}>
      <Header title={name} />
      <Content parts={parts} />
    </div>
  );
};

export default Course;
