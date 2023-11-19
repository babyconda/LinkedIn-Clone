import moment from "moment/moment";

export const getCurrentTimeStamp = (timeFormat) => {
  return moment().format(timeFormat);
  // return moment().startOf("hour").fromNow();
};
