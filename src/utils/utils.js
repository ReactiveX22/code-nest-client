import { format } from 'date-fns';

export const formatDate = (date) => {
  return format(new Date(date), 'hh:mm a, MMM d yyyy');
};

export function generateId() {
  return crypto.randomUUID();
}
