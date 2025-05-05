export function formatDate(date = new Date()) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
    "nl-NL",
    options
  );
  const dateInDutchFormat: string = formatter.format(date);

  // Voeg een komma toe na de dag
  const dateSegments: string[] = dateInDutchFormat.split(" ");
  const commaSeparatedDate: string = `${dateSegments[0]}, ${dateSegments
    .slice(1)
    .join(" ")}`;

  return commaSeparatedDate;
}
