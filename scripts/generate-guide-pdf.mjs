#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const guide = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../content/guides/7-daily-habits-healthspan.json"), "utf8")
);

const YELLOW = rgb(1, 0.859, 0);
const DARK = rgb(0.067, 0.094, 0.153);
const GRAY = rgb(0.42, 0.45, 0.5);
const SAGE = rgb(0.29, 0.49, 0.35);
const LIGHT = rgb(0.96, 0.96, 0.95);

const PAGE_W = 595;
const PAGE_H = 842;
const MARGIN = 50;
const CONTENT_W = PAGE_W - MARGIN * 2;

function sanitize(text) {
  return String(text)
    .replace(/\u2014/g, " - ")
    .replace(/\u2013/g, "-")
    .replace(/\u00b7/g, " - ")
    .replace(/[^\x00-\xFF]/g, "");
}

function wrapText(text, font, size, maxWidth) {
  const words = sanitize(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) line = test;
    else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawLines(page, lines, x, startY, size, font, color, lineHeight) {
  let y = startY;
  for (const line of lines) {
    if (y < MARGIN + 30) break;
    page.drawText(line, { x, y, size, font, color });
    y -= lineHeight;
  }
  return y;
}

function drawAccentBar(page) {
  page.drawRectangle({ x: 0, y: PAGE_H - 6, width: PAGE_W, height: 6, color: YELLOW });
}

function drawFooter(page, text, font) {
  page.drawText(sanitize(text), {
    x: MARGIN,
    y: 28,
    size: 8,
    font,
    color: GRAY,
  });
}

async function main() {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const italic = await pdf.embedFont(StandardFonts.HelveticaOblique);

  // Cover
  let page = pdf.addPage([PAGE_W, PAGE_H]);
  drawAccentBar(page);
  page.drawText("RENEW", { x: MARGIN, y: PAGE_H - 70, size: 12, font: bold, color: SAGE });
  page.drawRectangle({ x: MARGIN, y: PAGE_H - 98, width: 80, height: 4, color: YELLOW });
  page.drawText("FREE GUIDE", { x: MARGIN, y: PAGE_H - 118, size: 10, font: bold, color: DARK });

  let y = drawLines(
    page,
    wrapText(guide.title, bold, 26, CONTENT_W),
    MARGIN,
    PAGE_H - 160,
    26,
    bold,
    DARK,
    32
  );
  y = drawLines(
    page,
    wrapText(guide.subtitle, regular, 13, CONTENT_W),
    MARGIN,
    y - 16,
    13,
    regular,
    GRAY,
    18
  );
  y = drawLines(
    page,
    wrapText(guide.description, regular, 12, CONTENT_W),
    MARGIN,
    y - 20,
    12,
    regular,
    DARK,
    16
  );

  page.drawRectangle({ x: MARGIN, y: 200, width: CONTENT_W, height: 1, color: LIGHT });
  page.drawText("What's inside:", { x: MARGIN, y: 182, size: 11, font: bold, color: DARK });
  guide.habits.forEach((h, i) => {
    const lines = wrapText(`${h.number}. ${h.title}`, regular, 9, CONTENT_W);
    page.drawText(lines[0] || "", {
      x: MARGIN,
      y: 166 - i * 13,
      size: 9,
      font: regular,
      color: GRAY,
    });
  });
  page.drawText("renewhabits.com", { x: MARGIN, y: 48, size: 9, font: italic, color: GRAY });

  // Intro
  page = pdf.addPage([PAGE_W, PAGE_H]);
  drawAccentBar(page);
  page.drawText("How to use this guide", { x: MARGIN, y: PAGE_H - 70, size: 18, font: bold, color: DARK });
  drawLines(
    page,
    wrapText(guide.intro, regular, 12, CONTENT_W),
    MARGIN,
    PAGE_H - 105,
    12,
    regular,
    DARK,
    16
  );
  drawFooter(page, "RENEW - Introduction", regular);

  // Habits - 2 per page
  for (let i = 0; i < guide.habits.length; i += 2) {
    page = pdf.addPage([PAGE_W, PAGE_H]);
    drawAccentBar(page);
    y = PAGE_H - 55;

    for (let j = i; j < Math.min(i + 2, guide.habits.length); j++) {
      const habit = guide.habits[j];
      page.drawRectangle({ x: MARGIN, y: y - 4, width: 28, height: 28, color: YELLOW });
      page.drawText(String(habit.number), {
        x: MARGIN + (habit.number < 10 ? 10 : 6),
        y: y + 4,
        size: 14,
        font: bold,
        color: DARK,
      });

      y = drawLines(
        page,
        wrapText(habit.title, bold, 14, CONTENT_W - 36),
        MARGIN + 36,
        y + 8,
        14,
        bold,
        DARK,
        17
      );

      y = drawLines(
        page,
        wrapText(habit.summary, italic, 10, CONTENT_W),
        MARGIN,
        y - 6,
        10,
        italic,
        SAGE,
        13
      );

      y = drawLines(
        page,
        wrapText(habit.detail, regular, 11, CONTENT_W),
        MARGIN,
        y - 8,
        11,
        regular,
        DARK,
        14
      );

      page.drawText("This week:", { x: MARGIN, y: y - 6, size: 10, font: bold, color: DARK });
      y -= 22;
      for (const action of habit.actions) {
        const actionLines = wrapText(`- ${action}`, regular, 10, CONTENT_W - 12);
        y = drawLines(page, actionLines, MARGIN + 8, y, 10, regular, GRAY, 13);
      }

      y -= 28;
      if (j < Math.min(i + 1, guide.habits.length - 1)) {
        page.drawRectangle({ x: MARGIN, y: y + 12, width: CONTENT_W, height: 0.5, color: LIGHT });
        y -= 8;
      }
    }

    drawFooter(page, `RENEW - Habits ${i + 1}-${Math.min(i + 2, guide.habits.length)} of 7`, regular);
  }

  // Closing
  page = pdf.addPage([PAGE_W, PAGE_H]);
  drawAccentBar(page);
  page.drawText("Start with one habit this week", {
    x: MARGIN,
    y: PAGE_H - 80,
    size: 20,
    font: bold,
    color: DARK,
  });
  const closing =
    "Pick the habit that feels easiest. Run it for seven days, then add another. Longevity is built by repetition, not intensity. For more science-backed articles on nutrition, biohacking, and longevity, visit renewhabits.com.";
  drawLines(
    page,
    wrapText(closing, regular, 12, CONTENT_W),
    MARGIN,
    PAGE_H - 120,
    12,
    regular,
    GRAY,
    16
  );
  page.drawRectangle({ x: MARGIN, y: PAGE_H - 280, width: CONTENT_W, height: 60, color: YELLOW });
  page.drawText("RENEW", {
    x: MARGIN + 16,
    y: PAGE_H - 255,
    size: 14,
    font: bold,
    color: DARK,
  });
  page.drawText("Healthy living for a better future", {
    x: MARGIN + 16,
    y: PAGE_H - 275,
    size: 10,
    font: regular,
    color: DARK,
  });
  drawFooter(page, "RENEW - renewhabits.com", regular);

  const outPath = path.join(__dirname, "../public/downloads/renew-7-daily-habits-healthspan.pdf");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, await pdf.save());
  console.log("Wrote", outPath, `(${pdf.getPageCount()} pages)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
