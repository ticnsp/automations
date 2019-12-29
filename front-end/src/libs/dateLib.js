import * as moment from 'moment';

export function handleDateFieldChange(fieldName, handleFunction) {
  return (dateValue) => {
    const parsedDate = moment(dateValue).format('MM/DD/YYYY');
    const customEvent = {
      target: {
        id: fieldName,
        value: parsedDate,
      },
    };
    handleFunction(customEvent);
  };
}

export function parseDateField(stringDate) {
  if (stringDate) {
    return moment(stringDate, 'MM/DD/YYYY').toDate();
  }
  return moment().toDate();
}
