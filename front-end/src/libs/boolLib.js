export function handleBoolFieldChange(fieldName, handleFunction) {
  return (checkEvent) => {
    const parsedBool = checkEvent.target.checked
    const customEvent = {
      target: {
        id: fieldName,
        value: parsedBool,
      },
    };
    handleFunction(customEvent);
  };
}
