import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'STI Awareness Blog',
    description: (
      <>
        Our STI Awareness Blog is a valuable resource for information and insights on sexually transmitted infections. Explore our articles to learn about prevention, symptoms, and much more.
      </>
    ),
  },
  {
    title: 'Developer Tools: Datasets and APIs',
    description: (
      <>
        Access our developer tools, including datasets and APIs, to support your research and projects related to STI awareness. We provide the data you need for a deeper understanding of the subject.
      </>
    ),
  },
  {
    title: 'Statistical Reports',
    description: (
      <>
        Dive into our statistical reports section, where we offer comprehensive data and analysis on the prevalence and impact of sexually transmitted infections. Stay informed and make data-driven decisions.
      </>
    ),
  },
];
;

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <a href="/docs">View ALl doc</a>
        <p className='text--center padding-horiz--md'>Open Recent Post to see Other Posts as well</p>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
