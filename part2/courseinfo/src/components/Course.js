import React from 'react';

const Title = ({ title }) => {
  return <h2>{title}</h2>;
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

const Total = ({ parts }) => {
  const total = parts.reduce(function (acc, obj) {
    return acc + obj.exercises;
  }, 0);
  return (
    <div>
      <strong>Total of {total} exercises</strong>
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id} className="course">
          <Title title={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
