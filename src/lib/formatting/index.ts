export const formattingShortedURLWithTrotocol = (url: string) =>
  `http://localhost:8080/${url}`;
export const formattingShortedURL = (url: string) => `localhost:8080/${url}`;

export const dateFormatting = (date: Date) =>
  new Date(date).toLocaleDateString('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
