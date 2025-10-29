"use client";

import PptGenerator from "@/components/PptGenerator";
import {
  missionHighlights,
  strategicPriorities,
  timeline,
  stats
} from "@/components/presentationData";

export default function HomePage() {
  return (
    <main>
      <div className="card hero">
        <div className="badge">F STSC Department</div>
        <h1>Shaping Future-Ready Leaders in Science, Technology & Society</h1>
        <p>
          The F STSC Department integrates scientific rigor, cutting-edge technology, and social
          insight to prepare graduates who engineer systems that uplift communities. Explore our
          strategic agenda, performance highlights, and roadmap—and download the ready-to-present
          PowerPoint deck.
        </p>
        <div className="cta-group">
          <PptGenerator />
          <a className="secondary-btn" href="#roadmap">
            <span>View Roadmap</span>
          </a>
        </div>
      </div>

      <div className="content-grid">
        <section>
          <h2>Mission Priorities</h2>
          <div className="grid-two">
            {missionHighlights.map((item) => (
              <div key={item.title} className="timeline-item">
                <strong>{item.title}</strong>
                <span>{item.details}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Strategic Priorities 2024-2027</h2>
          <div className="grid-two">
            {strategicPriorities.map((priority) => (
              <div key={priority.label} className="timeline-item">
                <strong>{priority.label}</strong>
                <span>{priority.description}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Impact Snapshot</h2>
          <div className="grid-two">
            {stats.map((metric) => (
              <div key={metric.label} className="stat-card">
                <h3>{metric.label}</h3>
                <p>{metric.value}</p>
                <span>{metric.context}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="roadmap">
          <h2>Roadmap & Key Milestones</h2>
          <div className="timeline">
            {timeline.map((event) => (
              <div key={event.period} className="timeline-item">
                <strong>
                  {event.period} — {event.title}
                </strong>
                <span>{event.summary}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
