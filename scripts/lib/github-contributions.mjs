const DAY = 86400000;
const attribute = (html, name) => [...html.matchAll(/([\w-]+)="([^"]*)"/g)].find((match) => match[1] === name)?.[2];

export function parseContributions(html) {
  const tips = new Map();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = attribute(match[1], "for");
    const text = match[2].replace(/<[^>]*>/g, "").trim();
    const count = text.match(/^(No|[\d,]+) contributions?\b/i)?.[1];
    if (id && count) tips.set(id, count.toLowerCase() === "no" ? 0 : Number(count.replaceAll(",", "")));
  }
  const days = [];
  for (const match of html.matchAll(/<td\b[^>]*\bdata-date="[^"]*"[^>]*>/g)) {
    const date = attribute(match[0], "data-date");
    const level = Number(attribute(match[0], "data-level"));
    const count = tips.get(attribute(match[0], "id"));
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) ||
        new Date(date).toISOString().slice(0, 10) !== date || !Number.isInteger(level) || level < 0 || level > 4 ||
        !Number.isInteger(count) || count < 0) throw new Error("Unrecognized GitHub calendar cell");
    days.push({ date, count, level });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  if (!days.length) throw new Error("No contribution cells found");
  for (let i = 1; i < days.length; i++) {
    if (Date.parse(days[i].date) - Date.parse(days[i - 1].date) !== DAY) throw new Error("Incomplete or duplicate calendar dates");
  }
  return days;
}

export function calendarLayout(days) {
  if (!days.length) return { cells: [], weeks: 0, months: [] };
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells = [...Array(offset).fill(null), ...days];
  while (cells.length % 7) cells.push(null);
  const months = [];
  days.forEach((day, i) => {
    const date = new Date(`${day.date}T00:00:00Z`);
    if (date.getUTCDate() === 1 || (i === 0 && date.getUTCDate() < 8)) {
      months.push({ column: Math.floor((offset + i) / 7) + 1,
        label: date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) });
    }
  });
  return { cells, weeks: cells.length / 7, months };
}
