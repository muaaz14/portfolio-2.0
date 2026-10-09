import { skillsData } from "./data/skills-data";
import "./about.css";

const groupPositions = {
  q1:     { x: 25, y: 25 },
  q2:     { x: 75, y: 25 },
  q3:     { x: 75, y: 75 },
  q4:     { x: 25, y: 75 },
  q1q2:   { x: 50, y: 25 },
  q2q3:   { x: 75, y: 50 },
  q3q4:   { x: 50, y: 75 },
  q1q4:   { x: 25, y: 50 },
  center: { x: 50, y: 50 },
};

const groupLabels = {
  q1: "Q1",
  q2: "Q2",
  q3: "Q3",
  q4: "Q4",
  q1q2: "Q1–Q2",
  q2q3: "Q2–Q3",
  q3q4: "Q3–Q4",
  q1q4: "Q1–Q4",
  center: "Center",
};

// Place multiple skills around their group's anchor point.
function getSkillPosition(group, index, total) {
  const anchor = groupPositions[group];

  if (total === 1) {
    return anchor;
  }

  const angle = (index / total) * Math.PI * 2;
  const radius = total > 4 ? 8 : 5;

  return {
    x: anchor.x + Math.cos(angle) * radius,
    y: anchor.y + Math.sin(angle) * radius,
  };
}

function SkillsPlane() {
  const skills = Object.entries(skillsData).flatMap(
    ([group, names]) =>
      names.map((name, index) => ({
        name,
        group,
        position: getSkillPosition(
          group,
          index,
          names.length
        ),
      }))
  );

  return (
    <div className="about-plane-wrapper">
      <div
        className="about-plane"
        role="group"
        aria-label="Interactive map of my design and development skills"
      >
        {/* Cartesian axes */}
        <div className="plane-axis plane-axis-x" />
        <div className="plane-axis plane-axis-y" />

        {/* Quadrant labels */}
        <span className="plane-quadrant-label label-q1">
          Q1
        </span>
        <span className="plane-quadrant-label label-q2">
          Q2
        </span>
        <span className="plane-quadrant-label label-q3">
          Q3
        </span>
        <span className="plane-quadrant-label label-q4">
          Q4
        </span>

        {/* Skill nodes */}
        {skills.map((skill) => (
          <button
            key={`${skill.group}-${skill.name}`}
            type="button"
            className={`plane-skill plane-skill-${skill.group}`}
            style={{
              left: `${skill.position.x}%`,
              top: `${skill.position.y}%`,
            }}
            title={skill.name}
            aria-label={`${skill.name}, ${groupLabels[skill.group]}`}
          >
            <span className="plane-skill-tooltip">
              {skill.name}
            </span>
          </button>
        ))}

        {/* Center marker */}
        <div className="plane-center-marker" />
      </div>

      <p className="about-plane-caption">
        A map of the tools, techniques, and technologies
        I use to turn ideas into meaningful experiences.
        Hover over a dot to explore.
      </p>
    </div>
  );
}

export default function About() {
  return (
    <div className="about-page">
      {/* Introduction */}
      <section className="intro">
        <p className="eyebrow">About</p>

        <h2 className="about-heading">
          Designing with purpose.
          <br />
          Building with intention.
        </h2>

        <div className="intro-copy">
          <p>
            I'm Muaaz, a designer who enjoys working at the intersection of people, design, and technology.
            I care about understanding the problem before jumping into the solution.
          </p>

          <p>
            For me, good design isn't just about how something looks. It's about how it works, how
            it feels, and whether it makes someone's life a little easier.
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="approach">
        <div className="approach-heading-container">
          <p className="eyebrow">MY APPROACH</p>

          <h2 className="approach-heading">
            From understanding to implementation.
          </h2>
        
          <p className="approach-copy">
            I like to move between understanding people, exploring ideas, shaping interfaces, and bringing those ideas to life. I don't see design and
            development as separate worlds; I see them as parts of the same process.
          </p>
        </div>

        <div className="approach-cards-container">
          <article className="approach-card">
            <span className="about-step-number">01</span>
            <h3>Understand</h3>
            <p>
              Ask questions, research the context, and
              understand the people behind the problem.
            </p>
          </article>

          <article className="approach-card">
            <span className="about-step-number">02</span>
            <h3>Explore</h3>
            <p>
              Challenge assumptions, explore alternatives,
              and turn early ideas into something tangible.
            </p>
          </article>

          <article className="approach-card">
            <span className="about-step-number">03</span>
            <h3>Design</h3>
            <p>
              Create clear, considered experiences that
              balance user needs and product goals.
            </p>
          </article>

          <article className="approach-card">
            <span className="about-step-number">04</span>
            <h3>Implement</h3>
            <p>
              Work towards a real solution, collaborating
              across design and development along the way.
            </p>
          </article>
        </div>

        <div className="approach-grid">
          <article className="approach-item">
            <span className="about-step-number">01</span>
            <h3>Understand</h3>
            <p>
              Ask questions, research the context, and
              understand the people behind the problem.
            </p>
          </article>

          <article className="approach-item">
            <span className="about-step-number">02</span>
            <h3>Explore</h3>
            <p>
              Challenge assumptions, explore alternatives,
              and turn early ideas into something tangible.
            </p>
          </article>

          <article className="approach-item">
            <span className="about-step-number">03</span>
            <h3>Design</h3>
            <p>
              Create clear, considered experiences that
              balance user needs and product goals.
            </p>
          </article>

          <article className="approach-item">
            <span className="about-step-number">04</span>
            <h3>Implement</h3>
            <p>
              Work towards a real solution, collaborating
              across design and development along the way.
            </p>
          </article>
        </div>
      </section>

      {/* Tools and technologies */}
      <section className="about-section about-skills-section">
        <p className="eyebrow">MY TOOLKIT</p>

        <h2 className="about-section-heading">
          How I implement these ideas.
        </h2>

        <p className="about-section-copy">
          Every problem calls for a different approach.
          These are some of the tools, techniques, and
          technologies I draw on throughout the process.
          Their positions reflect how I connect different
          parts of my practice.
        </p>

        <SkillsPlane />
      </section>

      {/* Closing */}
      <section className="about-closing">
        <p className="eyebrow">WHAT DRIVES ME</p>

        <h2 className="about-closing-heading">
          Make it useful.
          <br />
          Make it thoughtful.
          <br />
          Make it human.
        </h2>

        <p className="about-closing-copy">
          I'm always interested in meaningful problems,
          thoughtful people, and opportunities to turn
          good ideas into things that work in the real world.
        </p>
      </section>
    </div>
  );
}