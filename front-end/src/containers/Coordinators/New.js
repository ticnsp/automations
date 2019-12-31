import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import CoordinatorForm from './Form';

export default function NewCoordinator(props) {
  function redirectAfterCreate(newCoordinator) {
    const { coordinatorId } = newCoordinator;
    props.history.push(`/coordinators/${coordinatorId}`);
  }

  return (
    <div className="pt-2">
      <h1 className="py-2">New Coordinator</h1>
      <CoordinatorForm
        redirectFunction={redirectAfterCreate}
      />
    </div>
  );
}