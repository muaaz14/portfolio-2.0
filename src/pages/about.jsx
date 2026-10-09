
import { useRef, useEffect, useState } from "react";
import { skillsData } from "./data/skills-data";
import "./about.css";

const groupPositions = {
  q1: { x: 25, y: 25 },
  q2: { x: 75, y: 25 },
  q3: { x: 75, y: 75 },
  q4: { x: 25, y: 75 },
  q1q2: { x: 50, y: 25 },
  q2q3: { x: 75, y: 50 },
  q3q4: { x: 50, y: 75 },
  q1q4: { x: 25, y: 50 },
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

function getSkillPosition(group, index, total) {
  const anchor = groupPositions[group];

  if (total === 1) return anchor;

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
        position: getSkillPosition(group, index, names.length),
      }))
  );

  return (
    <div className="skills-plane-wrapper">
      <div
        className="about-plane"
        role="group"
        aria-label="Interactive map of my design and development skills"
      >
        <div className="plane-axis plane-axis-x" />
        <div className="plane-axis plane-axis-y" />

        <span className="plane-quadrant-label label-q1">
          System
        </span>

        <span className="plane-quadrant-label label-q2">
          Exploration / Creativity
        </span>

        <span className="plane-quadrant-label label-q3">
          Execution
        </span>

        <span className="plane-quadrant-label label-q4">
          Humans
        </span>

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

        <div className="plane-center-marker" />
      </div>

      <p className="about-plane-caption">
        A map of the tools, techniques, and technologies I use to
        turn ideas into meaningful experiences. Hover over a dot
        to explore.
      </p>
    </div>
  );
}

export default function About() {
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const cardsContainerRef = useRef(null);
  const aboutPageRef = useRef(null);

  // Track the active About page section.
  useEffect(() => {
    const container = aboutPageRef.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll("[data-section]")
    );

    if (!sections.length) return;

    const updateActiveSection = () => {
      const containerRect = container.getBoundingClientRect();
      const threshold = containerRect.top + container.clientHeight * 0.35;

      let currentSection = 0;

      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= threshold) {
          currentSection = index;
        }
      });

      // Ensure the last section becomes active at the bottom.
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 5
      ) {
        currentSection = sections.length - 1;
      }

      setActiveSection(currentSection);
    };

    container.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();

    return () => {
      container.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  // Preserve horizontal scrolling for the approach cards.
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="about-layout">
      {/* Six-part vertical section indicator */}
      <div
        className="section-indicator"
        aria-hidden="true"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className={`section-indicator-segment ${
              activeSection === index ? "active" : ""
            }`}
          />
        ))}
      </div>

      {/* Scrollable About page */}
      <div className="about-page" ref={aboutPageRef}>
        <section className="intro" data-section>
          <p className="eyebrow">About</p>

          <h2 className="about-heading">
            Designing with purpose.
            <br />
            Building with intention.
          </h2>

          <div className="intro-copy">
            <p>
              I'm Muaaz, a designer who enjoys working at the
              intersection of people, design, and technology. I
              care about understanding the problem before jumping
              into the solution.
            </p>

            <p>
              For me, good design isn't just about how something
              looks. It's about how it works, how it feels, and
              whether it makes someone's life a little easier.
            </p>

            <button
              type="button"
              className="intro-toggle"
              onClick={() => setIsIntroExpanded(true)}
              hidden={isIntroExpanded}
            >
              read more...
            </button>

            <div
              className="intro-hidden"
              hidden={!isIntroExpanded}
            >
              <p>
                I’ve always been curious about how things work —
                not just technically, but emotionally. Why
                something feels intuitive. Why certain experiences
                stay with us.
              </p>

              <p>
                For me, design isn’t decoration. It’s intention
                made visible.
                <br />
                I see design as the responsibility of shaping how
                someone feels when they interact with something.
                It’s imagining the best possible experience — and
                then refining it, rebuilding it, and questioning
                it until it feels effortless.
              </p>

              <p>
                My journey into UX wasn’t linear. It was shaped by
                curiosity, movement, and a constant desire to
                understand people better. Over time, I realized I
                was always drawn to solving problems through
                creativity — where structure meets empathy, and
                systems meet storytelling.
              </p>

              <p>
                Today, I work as a UX Designer, growing from a
                Graduate Trainee into a full-time role, designing
                scalable systems and thoughtful experiences.
                Beyond work, I thrive on meaningful conversations,
                collaboration, and communities that challenge me
                to think deeper.
              </p>

              <p>
                I also carry a quiet love for front-end development
                — it helps me design with feasibility, edge cases,
                and developer experience in mind. Because design
                doesn’t end in Figma. It lives in implementation.
              </p>

              <p>
                At my core, I’m driven by growth — through
                uncertainty, ambiguity, and the stretch of learning
                something new.
              </p>

              <p>
                I don’t just want to make things look better. I
                want to make them work better — for people.
              </p>

              <button
                type="button"
                className="intro-toggle"
                onClick={() => setIsIntroExpanded(false)}
              >
                read less...
              </button>
            </div>
          </div>
        </section>

        <section className="approach" data-section>
          <div className="approach-heading-container">
            <p className="eyebrow">MY APPROACH</p>

            <h2 className="approach-heading">
              From understanding to implementation.
            </h2>

            <p className="approach-copy">
              I like to move between understanding people,
              exploring ideas, shaping interfaces, and bringing
              those ideas to life. I don't see design and
              development as separate worlds; I see them as parts
              of the same process.
            </p>
          </div>

          <div
            className="approach-cards-container"
            ref={cardsContainerRef}
          >
            <article className="approach-card">
              <span className="about-step-number">01</span>
              <h3>Understand</h3>
              <p>
                Ask questions, research the context, and understand
                the people behind the problem.
              </p>
            </article>

            <article className="approach-card">
              <span className="about-step-number">02</span>
              <h3>Explore</h3>
              <p>
                Challenge assumptions, explore alternatives, and
                turn early ideas into something tangible.
              </p>
            </article>

            <article className="approach-card">
              <span className="about-step-number">03</span>
              <h3>Design</h3>
              <p>
                Create clear, considered experiences that balance
                user needs and product goals.
              </p>
            </article>

            <article className="approach-card">
              <span className="about-step-number">04</span>
              <h3>Implement</h3>
              <p>
                Work towards a real solution, collaborating across
                design and development along the way.
              </p>
            </article>
          </div>
        </section>

        <section className="skills-section" data-section>
          <div className="skills-heading-container">
            <p className="eyebrow">MY TOOLKIT</p>

            <h2 className="skills-heading">
              How I implement these ideas.
            </h2>

            <p className="skills-copy">
              Every problem calls for a different approach. These
              are some of the tools, techniques, and technologies
              I draw on throughout the process. Their positions
              reflect how I connect different parts of my practice.
            </p>
          </div>

          <SkillsPlane />
        </section>

        <section className="ai" data-section>
          <p className="eyebrow">THOUGHTS</p>

          <h2 className="ai-heading">My Take on AI in UX</h2>

          <p className="ai-copy">
            AI isn’t here to replace designers.
            <br />
            It’s here to remove repetitive execution.
            <br />
            We won’t build every screen from scratch anymore.
            <br />
            We’ll define patterns, rules, and behaviors; and let
            systems do the heavy lifting.
            <br />
            To me, the future of UX lies at the intersection of:
            <br />
            <span>
              AI × Design Systems = Clear Thinking.
              <br />
            </span>
            The better we scope, the better AI executes.
          </p>
        </section>

        <section className="drive" data-section>
          <p className="eyebrow">WHAT DRIVES ME</p>

          <h2 className="drive-heading">
            Make it useful.
            <br />
            Make it thoughtful.
            <br />
            Make it human.
          </h2>

          <p className="drive-copy">
            I'm always interested in meaningful problems,
            thoughtful people, and opportunities to turn good ideas
            into things that work in the real world.
          </p>
        </section>

        <section className="contact" data-section>
          <p className="eyebrow">Contact</p>

          <h2>Interested in working together?</h2>

          <p className="contact-copy">
            Shoot me an email if you'd like to chat.
          </p>

          <a
            href="mailto:muaaz1501@gmail.com"
            className="email-link"
          >
            muaaz1501@gmail.com
          </a>
        </section>
      </div>
    </div>
  );
}