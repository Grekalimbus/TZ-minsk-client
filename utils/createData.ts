export function getFormattedDate(): {date:string,time: string}  {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds(); // Get seconds from the date object

  // Add leading zero to single-digit numbers
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds; // Format seconds with leading zero

  const formattedDate = `${formattedMonth}/${formattedDay}/${year}`;
  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`; // Include formatted seconds in the time string

  return { date: formattedDate, time: formattedTime };
}
