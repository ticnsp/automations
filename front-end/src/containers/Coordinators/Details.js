import React, { useState } from 'react';

export default function CoordinatorDetails(props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="pt-2">
      <h1 className="py-2">Coordinator Details</h1>
      {!isLoading && <span>test</span>}
    </div>
  );
}