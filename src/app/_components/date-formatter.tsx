import { parseISO, format, isValid } from "date-fns";

type Props = {
  dateString: string | Date;
};

const DateFormatter = ({ dateString }: Props) => {
  try {
    // Handle null/undefined
    if (!dateString) {
      return <span>No date available</span>;
    }

    const date: Date = new Date(dateString);

    // Check if date is valid
    if (!isValid(date)) {
      return <span>Invalid date</span>;
    }

    const dateTimeString = typeof dateString === 'string' ? dateString : date.toISOString();

    return <time dateTime={dateTimeString}>{format(date, "LLLL	d, yyyy")}</time>;
  } catch (error) {
    // Fallback for any unexpected errors
    console.error('DateFormatter error:', error);
    return <span>Invalid date</span>;
  }
};

export default DateFormatter;
