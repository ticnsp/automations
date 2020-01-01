import * as moment from 'moment';
import config from '../config';

const { dateFormat: appDateFormat } = config.app;

export function handleDateFieldChange(fieldName, handleFunction, dateFormat = appDateFormat) {
  return (dateValue) => {
    const parsedDate = moment(dateValue).format(dateFormat);
    const customEvent = {
      target: {
        id: fieldName,
        value: parsedDate,
      },
    };
    handleFunction(customEvent);
  };
}

export function parseDateField(stringDate, dateFormat = appDateFormat) {
  if (stringDate) {
    return moment(stringDate, dateFormat).toDate();
  }
  return moment().toDate();
}
