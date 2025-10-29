"use client";

import { useCallback, useState } from "react";
import { missionHighlights, strategicPriorities, timeline, stats } from "./presentationData";

declare global {
  interface Window {
    PptxGenJS?: new () => any;
  }
}

type GeneratorState = "idle" | "working" | "done" | "error";

const CDN_URL = "https://cdn.jsdelivr.net/npm/pptxgenjs@3.11.1/dist/pptxgen.min.js";
const SCRIPT_ID = "pptxgenjs-cdn";

async function loadPptxLibrary(): Promise<new () => any> {
  if (typeof window === "undefined") {
    throw new Error("PPTX generator is only available in the browser.");
  }

  if (window.PptxGenJS) {
    return window.PptxGenJS;
  }

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (existing && window.PptxGenJS) {
    return window.PptxGenJS;
  }

  return new Promise((resolve, reject) => {
    const script = existing ?? document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = CDN_URL;
    script.async = true;
    script.onload = () => {
      if (window.PptxGenJS) {
        resolve(window.PptxGenJS);
      } else {
        reject(new Error("PPTX library did not initialize as expected."));
      }
    };
    script.onerror = () => reject(new Error("Failed to load PPTX library from CDN."));
    if (!existing) {
      document.body.appendChild(script);
    }
  });
}

export default function PptGenerator() {
  const [status, setStatus] = useState<GeneratorState>("idle");

  const handleGenerate = useCallback(async () => {
    setStatus("working");
    try {
      const PptxGenCtor = await loadPptxLibrary();
      const pptx = new PptxGenCtor();

      pptx.layout = "LAYOUT_WIDE";

      const hero = pptx.addSlide();
      hero.addText("F STSC Department", {
        x: 0.6,
        y: 1,
        fontSize: 40,
        bold: true,
        color: "203764"
      });
      hero.addText("Engineering Futures at the Intersection of Science, Technology, and Society", {
        x: 0.6,
        y: 2.1,
        fontSize: 20,
        color: "4f81bd"
      });
      hero.addShape(pptx.ShapeType.rect, {
        x: 0.6,
        y: 3.3,
        w: 9.5,
        h: 2.4,
        fill: { color: "F1F5FB" },
        line: { color: "D7E3F5" }
      });
      hero.addText(
        "The F STSC Department advances interdisciplinary scholarship that merges foundational sciences with transformative technologies and social insight.",
        {
          x: 0.8,
          y: 3.5,
          w: 9.1,
          h: 2,
          fontSize: 16,
          color: "17365D"
        }
      );

      const missionSlide = pptx.addSlide();
      missionSlide.addText("Mission Priorities", {
        x: 0.6,
        y: 0.5,
        fontSize: 30,
        bold: true,
        color: "1f4e78"
      });
      missionHighlights.forEach((item, idx) => {
        missionSlide.addShape(pptx.ShapeType.roundRect, {
          x: 0.6 + idx * 3.2,
          y: 1.4,
          w: 3,
          h: 3.8,
          fill: { color: ["e8f0ff", "eef7ff", "f1f9ff"][idx % 3] },
          line: { color: "b4c7e7" },
          rounding: 0.4
        });
        missionSlide.addText(item.title, {
          x: 0.8 + idx * 3.2,
          y: 1.7,
          w: 2.6,
          fontSize: 18,
          bold: true,
          color: "1f4e78"
        });
        missionSlide.addText(item.details, {
          x: 0.8 + idx * 3.2,
          y: 2.2,
          w: 2.6,
          h: 2.4,
          fontSize: 14,
          color: "2f5597"
        });
      });

      const strategySlide = pptx.addSlide();
      strategySlide.addText("Strategic Priorities 2024-2027", {
        x: 0.6,
        y: 0.5,
        fontSize: 30,
        bold: true,
        color: "1f4e78"
      });
      strategicPriorities.forEach((priority, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        strategySlide.addShape(pptx.ShapeType.roundRect, {
          x: 0.6 + col * 4.7,
          y: 1.5 + row * 2.1,
          w: 4.4,
          h: 1.9,
          fill: { color: index % 2 === 0 ? "F5F1FF" : "E9F2FE" },
          line: { color: "C5CBE3" },
          rounding: 0.4
        });
        strategySlide.addText(priority.label, {
          x: 0.85 + col * 4.7,
          y: 1.65 + row * 2.1,
          w: 4.0,
          fontSize: 16,
          bold: true,
          color: "2f5597"
        });
        strategySlide.addText(priority.description, {
          x: 0.85 + col * 4.7,
          y: 1.95 + row * 2.1,
          w: 4.0,
          fontSize: 13,
          color: "385d8a"
        });
      });

      const impactSlide = pptx.addSlide();
      impactSlide.addText("Impact Snapshot", {
        x: 0.6,
        y: 0.5,
        fontSize: 30,
        bold: true,
        color: "1f4e78"
      });
      stats.forEach((metric, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        impactSlide.addShape(pptx.ShapeType.roundRect, {
          x: 0.6 + col * 4.7,
          y: 1.5 + row * 2.2,
          w: 4.4,
          h: 2.0,
          fill: { color: index % 2 === 0 ? "EAF3FF" : "EDF2FF" },
          line: { color: "BAC8E6" },
          rounding: 0.3
        });
        impactSlide.addText(metric.label, {
          x: 0.85 + col * 4.7,
          y: 1.65 + row * 2.2,
          w: 4.0,
          fontSize: 14,
          bold: true,
          color: "1f4e78"
        });
        impactSlide.addText(metric.value, {
          x: 0.85 + col * 4.7,
          y: 1.95 + row * 2.2,
          w: 4.0,
          fontSize: 26,
          bold: true,
          color: "2563eb"
        });
        impactSlide.addText(metric.context, {
          x: 0.85 + col * 4.7,
          y: 2.35 + row * 2.2,
          w: 4.0,
          fontSize: 12,
          color: "385d8a"
        });
      });

      const roadmapSlide = pptx.addSlide();
      roadmapSlide.addText("Roadmap & Key Milestones", {
        x: 0.6,
        y: 0.5,
        fontSize: 30,
        bold: true,
        color: "1f4e78"
      });
      timeline.forEach((event, index) => {
        roadmapSlide.addShape(pptx.ShapeType.roundRect, {
          x: 0.6,
          y: 1.4 + index * 1.4,
          w: 9.5,
          h: 1.1,
          fill: { color: index % 2 === 0 ? "F8FBFF" : "EEF3FF" },
          line: { color: "CBD5F5" },
          rounding: 0.25
        });
        roadmapSlide.addText(`${event.period} — ${event.title}`, {
          x: 0.85,
          y: 1.55 + index * 1.4,
          w: 8.6,
          fontSize: 15,
          bold: true,
          color: "1f4e78"
        });
        roadmapSlide.addText(event.summary, {
          x: 0.85,
          y: 1.85 + index * 1.4,
          w: 8.6,
          fontSize: 12,
          color: "385d8a"
        });
      });

      await pptx.writeFile({
        fileName: "F-STSC-Department-Overview.pptx"
      });

      setStatus("done");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }, []);

  const buttonLabel = {
    idle: "Download PPT Deck",
    working: "Preparing PPT...",
    done: "Download Again",
    error: "Retry Download"
  }[status];

  return (
    <button
      onClick={handleGenerate}
      className="primary-btn"
      disabled={status === "working"}
      aria-live="polite"
    >
      <span>{buttonLabel}</span>
    </button>
  );
}
