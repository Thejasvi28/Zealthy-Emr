// Utility function to format date without timezone conversion
export function formatDateTimeLocal(date: Date | string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatDateDisplay(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    month: '2-digit',
    day: '2-digit', 
    year: 'numeric'
  });
}

export function formatTimeDisplay(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });
}
