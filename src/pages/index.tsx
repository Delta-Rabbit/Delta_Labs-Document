import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          Professional technical documentation for an AI-driven educational platform with intelligent routing, design system, and layered architecture—for developers and technical contributors.
        </p>
        <div className={styles.buttons}>
          <Link className={styles.buttonPrimary} to="/docs/">
            Get Started &rarr;
          </Link>
          <Link className={styles.buttonSecondary} to="/docs/architecture/architecture-intro">
            View Architecture &rarr;
          </Link>
        </div>
      </div>
    </header>
  );
}

const FEATURES = [
  {
    title: 'AI-Driven Navigation',
    description: 'Intelligent routing and BotChat integration that guide users through the platform.',
    to: '/docs/architecture/full-system-architecture',
    icon: '🤖',
  },
  {
    title: 'Design System & Tokens',
    description: 'Design tokens, component library, and coding standards for consistent UI.',
    to: '/docs/design-system/design-intro',
    icon: '🎨',
  },
  {
    title: 'Event & State Flow',
    description: 'DataContext, aiNavigate events, and conditional rendering patterns.',
    to: '/docs/architecture/full-system-architecture',
    icon: '🔄',
  },
  {
    title: 'API & Architecture',
    description: 'API reference, system layers, and data flow documentation.',
    to: '/docs/reference/api-reference/README',
    icon: '📡',
  },
];

const QUICK_LINKS = [
  { label: 'Getting Started', to: '/docs/getting-started/introduction', desc: 'Setup and first steps' },
  { label: 'Architecture', to: '/docs/architecture/architecture-intro', desc: 'Backend, data, AI & full system' },
  { label: 'API Reference', to: '/docs/reference/api-reference/README', desc: 'Endpoints and conventions' },
  { label: 'Development Standards', to: '/docs/development-standards/standards-intro', desc: 'Coding standards and practices' },
];

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Delta Labs technical documentation: AI-driven platform, design system, coding standards, architecture, and API reference.">
      <HomepageHeader />
      <main>
        <div className="container padding-vert--xl">
          <h2 className="text--center margin-bottom--lg">Core Features</h2>
          <div className="row margin-bottom--xl">
            {FEATURES.map(({ title, description, to, icon }) => (
              <div key={title} className="col col--6 margin-bottom--lg">
                <div className={styles.featureCard}>
                  <span className={styles.featureIcon}>{icon}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <Link to={to}>Learn more &rarr;</Link>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text--center margin-bottom--lg">Quick Navigation</h2>
          <div className="row">
            {QUICK_LINKS.map(({ label, to, desc }) => (
              <div key={label} className="col col--6 col--3 margin-bottom--md">
                <Link to={to} className={styles.quickLink}>
                  <strong>{label}</strong>
                  <span className="text--secondary">{desc}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
