import test from "node:test";
import assert from "node:assert/strict";
import { parseContributions, calendarLayout } from "./lib/github-contributions.mjs";

function cell(date, id, count, level = 1) {
  return `<td id="${id}" data-level="${level}" data-date="${date}"></td><tool-tip for="${id}">${count} contributions on a date.</tool-tip>`;
}
test("parses GitHub row order into chronological dates, including zero and comma counts", () => {
  const days = parseContributions(cell("2026-01-02", "b", "1,234", 4) + cell("2026-01-01", "a", "No", 0));
  assert.deepEqual(days, [{ date: "2026-01-01", count: 0, level: 0 }, { date: "2026-01-02", count: 1234, level: 4 }]);
});
test("rejects missing counts instead of inventing zeros", () => {
  assert.throws(() => parseContributions('<td data-date="2026-01-01" data-level="1" id="a">'), /Unrecognized/);
});
test("rejects duplicate, missing, and impossible dates", () => {
  assert.throws(() => parseContributions(cell("2026-01-01", "a", "2") + cell("2026-01-01", "b", "3")), /duplicate/);
  assert.throws(() => parseContributions(cell("2026-01-01", "a", "2") + cell("2026-01-03", "b", "3")), /Incomplete/);
  assert.throws(() => parseContributions(cell("2026-02-30", "a", "2")), /Unrecognized/);
});
test("rejects changed markup and invalid intensity levels", () => {
  assert.throws(() => parseContributions("<html>Sign in</html>"), /No contribution/);
  assert.throws(() => parseContributions(cell("2026-01-01", "a", "2", 7)), /Unrecognized/);
});
test("aligns leap day across week boundaries without changing dates", () => {
  const days = parseContributions(cell("2024-02-29", "a", "2") + cell("2024-03-01", "b", "3"));
  const layout = calendarLayout(days);
  assert.equal(layout.weeks, 1);
  assert.equal(layout.cells[4].date, "2024-02-29");
  assert.equal(layout.cells[5].date, "2024-03-01");
  assert.equal(layout.cells[6], null);
});
test("handles an empty calendar", () => assert.deepEqual(calendarLayout([]), { cells: [], weeks: 0, months: [] }));
