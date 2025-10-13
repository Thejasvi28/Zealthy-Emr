// Utility functions to format dates WITHOUT timezone conversion
// These functions treat all dates as local time, ignoring timezones completely

export function formatDateTimeLocal(date: Date | string): string {
  // Parse the ISO string directly without timezone conversion
  const dateStr = typeof date === 'string' ? date : date.toISOString();
  // Extract YYYY-MM-DDTHH:MM directly
  return dateStr.slice(0, 16);
}

export function formatDateDisplay(date: Date | string): string {
  // Parse as UTC to display exactly what's in the database
  const dateStr = typeof date === 'string' ? date : date.toISOString();
  const [year, month, day] = dateStr.split('T')[0].split('-');
  return `${month}/${day}/${year}`;
}

export function formatTimeDisplay(date: Date | string): string {
  // Parse as UTC to display exactly what's in the database
  const dateStr = typeof date === 'string' ? date : date.toISOString();
  const time = dateStr.split('T')[1];
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

export function formatDateOnly(date: Date | string): string {
  // Parse as UTC and return YYYY-MM-DD for date input
  const dateStr = typeof date === 'string' ? date : date.toISOString();
  return dateStr.split('T')[0];
}
