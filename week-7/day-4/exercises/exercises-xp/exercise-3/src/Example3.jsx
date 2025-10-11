import React from 'react'
import data from './data.json'

class Example3 extends React.Component {
  render() {
    return (
       <div >
          <h2>Example 3 Component</h2>
          {data.Experiences.map((exp, index) => (
             <div key={index}>
                <img src={exp.logo} alt={exp.Company} />
                <a href={exp.url}>{exp.companyName}</a>
                <p>
                    {exp.roles[0].title}
                </p>
                <p>
                    {exp.roles[0].startDate } - {exp.roles[0].location}
                </p>
                <p>
                    {exp.roles[0].description}
                </p>
             </div>
          ))}
       </div>
    );
  }
}

export default Example3;
