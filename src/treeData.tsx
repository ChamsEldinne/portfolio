import { type ReactNode } from "react";

export interface TreeNode {
  id: string;
  name: string;
  type?: "folder" | "file";
  children: TreeNode[] | null;
  content?: ReactNode | null;
}

/* ------------------------------------------------------------------ */
/* Small terminal-flavoured building blocks, reused across file bodies */
/* ------------------------------------------------------------------ */


const Key = ({ children }: { children: ReactNode }) => (
  <span className="text-brand-cyan">{children}</span>
);

const Val = ({ children }: { children: ReactNode }) => (
  <span className="text-text">{children}</span>
);

const Muted = ({ children }: { children: ReactNode }) => (
  <span className="text-muted">{children}</span>
);

const Tag = ({ children }: { children: ReactNode }) => (
  <span className="text-brand-purple">{children}</span>
);

const Comment = ({ children }: { children: ReactNode }) => (
  <div className="text-muted"># {children}</div>
);

const Row = ({ k, v }: { k: ReactNode; v: ReactNode }) => (
  <div>
    <Key>{k}</Key>
    <Muted>: </Muted>
    <Val>{v}</Val>
  </div>
);

const Bullet = ({ children }: { children: ReactNode }) => (
  <div className="pl-2">
    <span className="text-brand-yellow">→ </span>
    <span className="text-text">{children}</span>
  </div>
);

const Link = ({ href, label }: { href: string; label?: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-brand-blue underline decoration-dotted hover:text-brand-cyan"
  >
    {label ?? href}
  </a>
);

/* ------------------------------------------------------------------ */
/* profile.md                                                         */
/* ------------------------------------------------------------------ */

const profile: TreeNode = {
  id: "profile",
  name: "profile.md",
  type: "file",
  children: null,
  content: (
    <div className="space-y-2 leading-relaxed">
      <div className="text-brand-green"># whoami</div>
      <p className="text-text">
        Software Engineer with nearly two years of experience building modern
        web applications from idea to production. Experience developing SaaS
        platforms, AI-powered tools, booking systems, and real-time
        applications, across both frontend and backend.
      </p>
      <div className="text-brand-green"># stack</div>
      <p className="text-text">
        <Tag>Next.js</Tag> · <Tag>React</Tag> · <Tag>Laravel</Tag> ·{" "}
        <Tag>Express.js</Tag> · <Tag>PostgreSQL</Tag> · <Tag>MySQL</Tag> ·{" "}
        <Tag>Docker</Tag> · <Tag>Redis</Tag>
      </p>
      <div className="text-brand-green"># notes</div>
      <p className="text-text">
        Before AI-assisted development became common, I built projects and
        strengthened my programming fundamentals by writing code from scratch
        and solving algorithmic problems — an experience that still shapes how
        I approach engineering today. Currently deepening my knowledge of
        software architecture, system design, and cloud technologies.
      </p>
    </div>
  ),
};

/* ------------------------------------------------------------------ */
/* experience/                                                        */
/* ------------------------------------------------------------------ */

const fennecBooking: TreeNode = {
  id: "fennecbooking",
  name: "fennecbooking.log",
  type: "file",
  children: null,
  content: (
    <div className="space-y-2">
      <Row k="role" v="Frontend Developer" />
      <Row k="company" v="FennecBooking · Part-time" />
      <Row k="period" v="Dec 2025 – Mar 2026 · 4 mos" />
      <Row k="location" v="Algiers, Algeria · Hybrid" />
      <div className="pt-2 text-brand-green">description : </div>
      <p className="text-text">
        Converted Figma designs into fully functional user interfaces and
        integrated them with the backend. Worked on authentication, online
        payments, dynamic booking forms, ticket tracking, a profile page, and
        admin dashboards for the agency.
      </p>
      <div className="pt-2 text-brand-green">tech : </div>
      <p className="text-text">
        <Tag>Next.js</Tag> <Tag>API</Tag> <Tag>Tailwind CSS</Tag> <Tag>PWA</Tag>
      </p>
    </div>
  ),
};

const examee: TreeNode = {
  id: "examee",
  name: "examee-platform.log",
  type: "file",
  children: null,
  content: (
    <div className="space-y-2">
      <Row k="role" v="Full-Stack Developer" />
      <Row k="project" v={<Link href="https://examee.online" label="Exams Platform — examee.online" />} />
      <Row k="period" v="Jan 2025 – Sept 2026" />
      <div className="pt-2 text-brand-green">description : </div>
      <p className="text-text">
        A SaaS platform that helps universities and companies replace onsite
        paper-based exams with secure, computer-based assessments. Designed,
        developed, and deployed the entire platform solo, integrating Safe
        Exam Browser to ensure exam integrity. Teachers can create quizzes,
        coding challenges, and diagram-drawing questions, with full control
        over the exam process — including banning or re-allowing students on
        violation. All exams are auto-graded, returning scores from 0% to 100%
        instantly.
      </p>
      <div className="pt-2 text-brand-green">features :</div>
      <Bullet>
        <span className="text-brand-yellow">questions</span> — true/false,
        coding, diagram drawing, and open-ended question types
      </Bullet>
      <Bullet>
        <span className="text-brand-yellow">grading</span> — auto-graded by
        type; diagrams and open-ended answers graded by the exam creator
      </Bullet>
      <Bullet>
        <span className="text-brand-yellow">anti-cheat</span> — full-screen
        mode, Safe Exam Browser, activity tracking &amp; monitoring
      </Bullet>
      <Bullet>
        <span className="text-brand-yellow">realtime</span> — WebRTC live
        camera calling, instant sync between students and teachers
      </Bullet>
      <div className="pt-2 text-brand-green"> tech:</div>
      <p className="text-text">
        <Tag>Next.js</Tag> <Tag>React Query</Tag> <Tag>Monaco Editor</Tag>{" "}
        <Tag>Laravel</Tag> <Tag>MySQL</Tag> <Tag>Reverb</Tag>{" "}
        <Tag>Tailwind CSS</Tag> <Tag>WebRTC</Tag> <Tag>FastAPI</Tag>{" "}
        <Tag>Docker</Tag>
      </p>
    </div>
  ),
};

const experience: TreeNode = {
  id: "experience",
  name: "experience",
  type: "folder",
  children: [fennecBooking, examee],
};

/* ------------------------------------------------------------------ */
/* projects/                                                          */
/* ------------------------------------------------------------------ */

const dbforge: TreeNode = {
  id: "dbforge",
  name: "dbforge.json",
  type: "file",
  children: null,
  content: (
    <div className="space-y-2">
      <Row k="name" v="AI Database Design Agent (DBForge)" />
      <Row k="link" v={<Link href="https://dbforge.online" />} />
      <Row k="type" v="Personal Project" />
      <div className="pt-2 text-brand-green">description : </div>
      <p className="text-text">
        An AI-powered developer tool that assists in designing, improving, and
        evolving database schemas from natural language descriptions. Generates
        visual database structures and auto-produces project boilerplate —
        migrations, models, factories, and seeders — to help developers start
        backend projects faster.
      </p>
      <div className="pt-2 text-brand-green">features :</div>
      <Bullet>
        <span className="text-brand-yellow">schema-agent</span> — analyzes
        requirements and generates tables, relationships, and structures
      </Bullet>
      <Bullet>
        <span className="text-brand-yellow">codegen</span> — framework-ready
        migrations, models, factories, and seeders from the designed schema
      </Bullet>
      <Bullet>
        <span className="text-brand-yellow">visual-editor</span> — interactive
        UI for viewing and modifying table relationships
      </Bullet>
      <div className="pt-2 text-brand-green">tech : </div>
      <p className="text-text">
        <Tag>Next.js</Tag> <Tag>React Query</Tag> <Tag>FastAPI</Tag>{" "}
        <Tag>LangChain</Tag> <Tag>LangGraph</Tag>
      </p>
    </div>
  ),
};

const hikingPlatform: TreeNode = {
  id: "hiking-platform",
  name: "hiking-volunteer-platform.md",
  type: "file",
  children: null,
  content: (
    <div className="space-y-2">
      <Row k="name" v="Hiking and Volunteering Platform" />
      <Row k="location" v="Algeria" />
      <Row k="context" v="Bachelor's final year project" />
      <div className="pt-2 text-brand-green">description : </div>
      <p className="text-text">
        Built with a UI/UX designer and a backend developer, this platform
        connects outdoor enthusiasts, travel agents, and volunteers through
        organized trails and public events.
      </p>
      <div className="pt-2 text-brand-green"> features:</div>
      <Bullet>
        <span className="text-brand-yellow">trail-management</span> —
        organizers create, schedule, and manage trails and events
      </Bullet>
      <Bullet>
        <span className="text-brand-yellow">participation</span> —
        authenticated users browse, join, and get notified about events
      </Bullet>
      <Bullet>
        <span className="text-brand-yellow">social</span> — profiles,
        achievements, posts, likes, and comments
      </Bullet>
      <div className="pt-2 text-brand-green">tech : </div>
      <p className="text-text">
        <Tag>Next.js</Tag> <Tag>React Query</Tag> <Tag>JavaScript</Tag>{" "}
        <Tag>Tailwind CSS</Tag>
      </p>
    </div>
  ),
};

const ecommerce: TreeNode = {
  id: "ecommerce",
  name: "ecommerce-platform.js",
  type: "file",
  children: null,
  content: (
    <div className="space-y-2">
      <Row k="name" v="E-commerce Platform" />
      <Row k="role" v="Full-Stack Developer" />
      <Row k="year" v="2024" />
      <Row k="location" v="Algeria" />
      <div className="pt-2 text-brand-green">description : </div>
      <p className="text-text">
        A fully functional e-commerce app for browsing and purchasing
        products, with carts, favorites, and reviews. Includes secure
        authentication, order management, and promo codes. Admins manage
        stock, track orders, and drive customer engagement.
      </p>
      <div className="pt-2 text-brand-green">tech : </div>
      <p className="text-text">
        <Tag>Next.js</Tag> <Tag>Redux</Tag> <Tag>Laravel</Tag>{" "}
        <Tag>SQLite</Tag> <Tag>JavaScript</Tag> <Tag>Tailwind CSS</Tag>{" "}
        <Tag>API</Tag>
      </p>
    </div>
  ),
};

const chatApp: TreeNode = {
  id: "chat-app",
  name: "chat-application.ts",
  type: "file",
  children: null,
  content: (
    <div className="space-y-2">
      <Row k="name" v="Chat Application" />
      <Row k="role" v="Full-Stack Developer" />
      <Row k="year" v="2024" />
      <Row k="location" v="Algeria" />
      <div className="pt-2 text-brand-green">description : </div>
      <p className="text-text">
        A real-time chat platform with a friends system and chat groups,
        ensuring instant data synchronization. Users connect with friends,
        join groups, and discuss; group admins control membership requests.
      </p>
      <div className="pt-2 text-brand-green">tech : </div>
      <p className="text-text">
        <Tag>Laravel</Tag> <Tag>Next.js</Tag> <Tag>SQLite</Tag>{" "}
        <Tag>JavaScript</Tag> <Tag>Tailwind CSS</Tag> <Tag>React Query</Tag>{" "}
        <Tag>Reverb</Tag>
      </p>
    </div>
  ),
};

const projects: TreeNode = {
  id: "projects",
  name: "projects",
  type: "folder",
  children: [dbforge, hikingPlatform, ecommerce, chatApp],
};

/* ------------------------------------------------------------------ */
/* skills.yaml                                                        */
/* ------------------------------------------------------------------ */

const levelColor: Record<string, string> = {
  Advanced: "text-brand-green",
  Intermediate: "text-brand-yellow",
  Beginner: "text-brand-red",
};

const SkillLine = ({ name, level }: { name: string; level: string }) => (
  <div className="flex justify-between max-w-xs">
    <span className="text-text">{name}</span>
    <span className={levelColor[level] ?? "text-muted"}>{level}</span>
  </div>
);

const skills: TreeNode = {
  id: "skills",
  name: "skills.yaml",
  type: "file",
  children: null,
  content: (
    <div className="space-y-2">
      <div className="text-brand-green"># frontend</div>
      <SkillLine name="Next.js" level="Advanced" />
      <SkillLine name="React" level="Advanced" />
      <SkillLine name="JavaScript" level="Advanced" />
      <SkillLine name="TypeScript" level="Advanced" />
      <SkillLine name="GraphQL" level="Beginner" />

      <div className="pt-1 text-brand-green"># backend</div>
      <SkillLine name="Laravel" level="Advanced" />
      <SkillLine name="PHP" level="Advanced" />
      <SkillLine name="Express.js" level="Intermediate" />
      <SkillLine name="FastAPI" level="Beginner" />
      <SkillLine name="API Development" level="Advanced" />
      <SkillLine name="WebSockets" level="Advanced" />
      <SkillLine name="WebRTC" level="Intermediate" />

      <div className="pt-1 text-brand-green"># fundamentals</div>
      <SkillLine name="SQL" level="Advanced" />
      <SkillLine name="Clean Code" level="Advanced" />
      <SkillLine name="System Design" level="Intermediate" />
      <SkillLine name="Design Patterns" level="Intermediate" />
      <SkillLine name="OOP" level="Advanced" />
      <SkillLine name="Algorithms & Data Structures" level="Advanced" />
      <SkillLine name="Problem Solving" level="Advanced" />
      <SkillLine name="Java" level="Intermediate" />

      <div className="pt-1 text-brand-green"># ai / tooling</div>
      <SkillLine name="LangGraph" level="Intermediate" />

      <div className="pt-1 text-brand-green"># devops / infra</div>
      <SkillLine name="Git" level="Advanced" />
      <SkillLine name="SSH" level="Advanced" />
      <SkillLine name="Linux" level="Advanced" />
      <SkillLine name="K6" level="Intermediate" />
      <SkillLine name="Playwright" level="Intermediate" />
      <SkillLine name="AWS" level="Beginner" />
    </div>
  ),
};

/* ------------------------------------------------------------------ */
/* education/                                                         */
/* ------------------------------------------------------------------ */

// const masterAI: TreeNode = {
//   id: "masters",
//   name: "masters-ai.log",
//   type: "file",
//   children: null,
//   content: (
//     <div className="space-y-2">
//       <Row k="degree" v="Master in Artificial Intelligence" />
//       <Row k="school" v="University" />
//       <Row k="period" v="2025 – 2027" />
//       <Row k="location" v="Algeria" />
//     </div>
//   ),
// };

const bachelorCS: TreeNode = {
  id: "bachelor",
  name: "bachelor-cs.log",
  type: "file",
  children: null,
  content: (
    <div className="space-y-2">
      <Row k="degree" v="Bachelor's Degree in Computer Science" />
      <Row k="school" v="University" />
      <Row k="period" v="2022 – 2025" />
      <Row k="location" v="Algeria" />
    </div>
  ),
};

const education: TreeNode = {
  id: "education",
  name: "education",
  type: "folder",
  children: [bachelorCS],
};

/* ------------------------------------------------------------------ */
/* contact.sh                                                         */
/* ------------------------------------------------------------------ */

const languages: TreeNode = {
  id: "languages",
  name: "languages.log",
  type: "file",
  children: null,
  content: (
    <div>
      <div className="pt-2 text-brand-green"># languages</div>
      <p className="text-text">
        <Tag>Arabic</Tag> <span className="text-muted">(fluent)</span> ·{" "}
        <Tag>English</Tag> <span className="text-muted">(advanced)</span> ·{" "}
        <Tag>French</Tag> <span className="text-muted">(intermediate)</span>
      </p>
    </div>
  )
};

const contact: TreeNode = {
  id: "contact",
  name: "contact.sh",
  type: "file",
  children: null,
  content: (
    <div className="space-y-2">
      <div className="text-brand-green">#!/bin/sh</div>
      <Comment>reach out any time, replies are fast</Comment>
      <Row k="name" v="Chamseddin Boukhelkhal" />
      <Row k="role" v="Software Engineer | Full Stack Web Developer" />
      <Row
        k="email"
        v={
          <Link
            href="mailto:boukhalkhalchamseldin@gmail.com"
            label="boukhalkhalchamseldin@gmail.com"
          />
        }
      />
      <Row k="phone" v="+213 553 11 22 60" />
      <Row k="location" v="Algeria, Médéa" />
      <Row
        k="linkedin"
        v={
          <Link
            href="https://www.linkedin.com/in/chams-eldinne-boukhelkhal-577228282/"
            label="/in/chams-eldinne-boukhelkhal"
          />
        }
      />
      <Row
        k="github"
        v={<Link href="https://github.com/ChamsEldinne" label="ChamsEldinne" />}
      />
      
    </div>
  ),
};

/* ------------------------------------------------------------------ */
/* root                                                                */
/* ------------------------------------------------------------------ */

export const treeData: TreeNode = {
  id: "root",
  name: "~/chams-eldinne",
  type: "folder",
  children: [profile, experience, projects, skills, education, contact , languages],
};

export default treeData;