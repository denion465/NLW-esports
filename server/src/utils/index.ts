export const convertHourStringToMinutes = (hourString: string) => {
  const [hours, minutes] = hourString.split(':').map(Number);
  const minutesAmopunt = (hours * 60) + minutes;
  return minutesAmopunt;
};

export const convertMinutesToHourString = (minutesAmount: number) => {
  const hour = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;
  return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
