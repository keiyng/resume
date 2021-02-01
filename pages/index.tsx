import React, {useState} from 'react';
import Head from 'next/head'
import {useQuery, gql} from "@apollo/client";
import {format} from 'date-fns';

import {print} from "graphql/language/printer";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import prismStyle from "react-syntax-highlighter/dist/cjs/styles/prism/xonokai"
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faEye } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {Button, Popover, Divider} from '@material-ui/core'

const ResumeQuery = gql`
  query ResumeQuery {
  bio {
    name
    email
    tagline
    linkedin
    github
    phone
  }
  positions {
    id
    title
    employmentType
    company
    location
    startDate
    endDate
    years
    months
    achievements
  }
  skills {
    frontEnd
    backEnd
    database
    others
  }
  education {
    id
    degree
    school
    description
    endDate
  }
}
`

const displaySkills = (skills) => {
  return skills.map((skill, idx)=> <span key={skill}>{skill}{idx === skills.length - 1 ? '' : ', '} </span>)
}

export default function Home() {
  const {data, error, loading} = useQuery(ResumeQuery);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement| null>(null);

  if(loading) {
    return <div className={styles.loading}>
      <div className={styles.loadingContainer}>
      <h1>Kei Ng</h1>
      <h2>Fetching my resume...</h2>
      <SyntaxHighlighter language="graphql" style={prismStyle}>
        {print(ResumeQuery)}
      </SyntaxHighlighter>
      </div>
    </div>
  }

  if(error) {
    return <span>Error...oops!</span>
  }

  const {bio, positions, education, skills} = data;


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
   <>
    <Head>
      <title>Kei Ng</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;600&display=swap" rel="stylesheet" />
    </Head>
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>{bio.name}</h1>
          <p className={styles.tagline}>{bio.tagline}</p>
        </div>
        <div>
          <div><FontAwesomeIcon icon={faPhone} />{' '}{bio.phone}</div>
          <div><FontAwesomeIcon icon={faEnvelope} />{' '}<a href={`mailto:${bio.email}`}>{bio.email}</a></div>
          <div><FontAwesomeIcon icon={faLinkedin} />{' '}<a href={bio.linkedin}>{bio.linkedin.replace("https://", "")}</a></div>
          <div><FontAwesomeIcon icon={faGithub} />{' '}<a href={bio.github}>{bio.github.replace("https://", "")}</a></div>
        </div>
      </header>
    <div className={styles.sections}>
      <section>
        <h2>Experience</h2>
        {positions.map(position => {
          const length = [
            position.years > 0 ? `${position.years} yrs` : null,
            position.months > 0 ? `${position.months} mths` : null
          ].filter(str => str).join(" ")

          return (<div key={position.id} className={styles.position}>
            <h3>{position.title} <span>({position.employmentType})</span></h3>
            <p className={styles.light}>{position.company} | {position.location}</p>
            <p className={styles.light}>
              {format(new Date(position.startDate), "MMM yyyy")} - {position.endDate ? format(new Date(position.endDate), "MMM yyyy") : "Current"}{" "}
              ({length})
            </p>
            <ul>
              {position.achievements.map(
                achievement => <li key={achievement}>{achievement}</li>
              )}
            </ul>
          </div>)
        })}
        </section>
        <section>
        <h2>Education</h2>
        {education.map(edu => {
          return (
          <div key={edu.id} className={styles.education}>
            <h3>
              {edu.degree.split(",").map(item => <React.Fragment key={item}><span>{item}</span><br /></React.Fragment>
            )}
            </h3>
            <p className={styles.light}>
              {edu.school}{" "}
            <span>(class {format(new Date(edu.endDate), "yyyy")})</span>
            </p>
            <p>{edu.description}</p>
          </div>)
        })}
      </section>
      <section>
        <h2>Skills</h2>
        <div className={styles.skills}>
          <div><strong>Front End</strong>{" "}: {displaySkills(skills.frontEnd)}</div>
          <div><strong>Back End</strong>{" "}: {displaySkills(skills.backEnd)}</div>
          <div><strong>Database</strong>{" "}: {displaySkills(skills.database)}</div>
          <div><strong>Others</strong>{" "}: {displaySkills(skills.others)}</div>
        </div>
      </section>
      <Divider style={{margin: '1em 0'}}/>
        <Button style={{margin: '1em 0'}}color="primary" onClick={handleClick}>See the GraphQL query of this resume<FontAwesomeIcon icon={faEye} /></Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
         <SyntaxHighlighter language="graphql" style={prismStyle}>
          {print(ResumeQuery)}
        </SyntaxHighlighter>
      </Popover>
    </div>
    </div>
   </>
  )
}
