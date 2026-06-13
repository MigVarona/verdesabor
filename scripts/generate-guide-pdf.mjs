#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const YELLOW = rgb(1, 0.859, 0);
const DARK = rgb(0.067, 0.094, 0.153);
const GRAY = rgb(0.42, 0.45, 0.5);
const SAGE = rgb(0.29, 0.49, 0.35);

const habits = [
  {
    title: "Get morning sunlight within 60 minutes of waking",
    body:
      "Ten to fifteen minutes of outdoor light anchors your circadian clock, improves evening sleepiness, and supports metabolic rhythm. A walk counts. Sunglasses off when safe.",
  },
  {
    title: "Move at Zone 2 for at least 30 minutes most days",
    body:
      "Brisk walking or easy cycling at conversational pace builds mitochondrial health and insulin sensitivity. Aim for roughly 150 minutes per week.",
  },
  {
    title: "Eat a protein-forward first meal",
    body:
      "Target 25–40g of protein at your first substantial meal to stabilize energy, support muscle, and reduce afternoon cravings.",
  },
  {
    title: "Keep a consistent sleep and wake window",
    body:
      "Same 30-minute bedtime and wake window — even weekends — is one of the highest-leverage sleep habits. Prioritize 7–9 hours in a cool, dark room.",
  },
  {
    title: "Wind down with a magnesium-rich evening ritual",
    body:
      "Magnesium glycinate (if tolerated), dim lights, tea, stretching, or journaling signal your nervous system that the day is ending.",
  },
  {
    title: "Use brief cold exposure 2–3 times per week",
    body:
      "End showers with 30–90 seconds of cool water. Start small. Slow nasal breathing. Consistency and safety over intensity.",
  },
  {
    title: "Protect a digital sunset before bed",
    body:
      "Screens down 60 minutes before sleep. Phone away from bed. Reduce stimulation — not just blue light — for deeper rest.",
  },
];

function wrapText(text, font, size, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) {
      line = test;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function main() {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const italic = await pdf.embedFont(StandardFonts.HelveticaOblique);

  const pageWidth = 595;
  const pageHeight = 842;
  const margin = 56;
  const contentWidth = pageWidth - margin * 2;

  // Cover page
  let page = pdf.addPage([pageWidth, pageHeight]);
  page.drawRectangle({ x: 0, y: pageHeight - 8, width: pageWidth, height: 8, color: YELLOW });
  page.drawText("RENEW", { x: margin, y: pageHeight - 72, size: 11, font: bold, color: SAGE });
  page.drawText("FREE GUIDE", {
    x: margin,
    y: pageHeight - 100,
    size: 10,
    font: bold,
    color: DARK,
  });
  page.drawRectangle({
    x: margin,
    y: pageHeight - 108,
    width: 72,
    height: 3,
    color: YELLOW,
  });

  const title = "7 Daily Habits for a Longer Healthspan";
  const titleLines = wrapText(title, bold, 28, contentWidth);
  let y = pageHeight - 160;
  for (const line of titleLines) {
    page.drawText(line, { x: margin, y, size: 28, font: bold, color: DARK });
    y -= 34;
  }

  const subtitle =
    "A practical guide to habits that compound over years — morning light, movement, nutrition, sleep, and recovery.";
  const subtitleLines = wrapText(subtitle, regular, 13, contentWidth);
  y -= 12;
  for (const line of subtitleLines) {
    page.drawText(line, { x: margin, y, size: 13, font: regular, color: GRAY });
    y -= 18;
  }

  page.drawText("renewhabits.com", {
    x: margin,
    y: 80,
    size: 10,
    font: italic,
    color: GRAY,
  });

  // Habits pages
  for (const habit of habits) {
    page = pdf.addPage([pageWidth, pageHeight]);
    page.drawRectangle({ x: 0, y: pageHeight - 6, width: pageWidth, height: 6, color: YELLOW });

    const index = habits.indexOf(habit) + 1;
    page.drawCircle({ x: margin + 16, y: pageHeight - 72, size: 16, color: YELLOW });
    page.drawText(String(index), {
      x: margin + (index < 10 ? 12 : 8),
      y: pageHeight - 78,
      size: 14,
      font: bold,
      color: DARK,
    });

    const habitTitleLines = wrapText(habit.title, bold, 16, contentWidth - 40);
    y = pageHeight - 68;
    for (const line of habitTitleLines) {
      page.drawText(line, { x: margin + 40, y, size: 16, font: bold, color: DARK });
      y -= 20;
    }

    y -= 16;
    const bodyLines = wrapText(habit.body, regular, 12, contentWidth);
    for (const line of bodyLines) {
      if (y < margin + 40) break;
      page.drawText(line, { x: margin, y, size: 12, font: regular, color: DARK });
      y -= 16;
    }

    page.drawText(`RENEW  ·  Habit ${index} of 7`, {
      x: margin,
      y: 40,
      size: 9,
      font: regular,
      color: GRAY,
    });
  }

  // Closing page
  page = pdf.addPage([pageWidth, pageHeight]);
  page.drawRectangle({ x: 0, y: pageHeight - 8, width: pageWidth, height: 8, color: YELLOW });
  page.drawText("Start with one habit this week.", {
    x: margin,
    y: pageHeight - 120,
    size: 20,
    font: bold,
    color: DARK,
  });
  const closing =
    "Pick the habit that feels easiest, run it for seven days, then add another. Longevity is built by repetition — not intensity. For more science-backed guides, visit renewhabits.com.";
  const closingLines = wrapText(closing, regular, 12, contentWidth);
  y = pageHeight - 160;
  for (const line of closingLines) {
    page.drawText(line, { x: margin, y, size: 12, font: regular, color: GRAY });
    y -= 16;
  }

  const outDir = path.join(process.cwd(), "public", "downloads");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "renew-7-daily-habits-healthspan.pdf");
  fs.writeFileSync(outPath, await pdf.save());
  console.log("Wrote", outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
