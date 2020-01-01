import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import SemesterForm from './Form';

export default function NewSemester(props) {
  function redirectAfterCreate(newSemester) {
    const { semesterId } = newSemester;
    props.history.push(`/semesters/${semesterId}`);
  }

  return (
    <div className="pt-2">
      <h1 className="py-2">New Semester</h1>
      <SemesterForm
        redirectFunction={redirectAfterCreate}
      />
    </div>
  );
}