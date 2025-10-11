import React from 'react';
import data from './data.json';

class Example2 extends React.Component {
  render() {
    return (
       <div>
          <h2>Example 2 Component</h2>
          {Object.entries(data.Skills).map(([, skill], index) => (
             <div key={index}>
                <h3>{skill.Area}</h3>
                <ul>
                   {skill.SkillSet.map((s) => (
                      <li key={s.Name}>{s.Name}</li>
                   ))}
                </ul>
             </div>
          ))}
       </div>
    );
  }
}

export default Example2;