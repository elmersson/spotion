export function formatDateString(dateString: string): string {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
}
