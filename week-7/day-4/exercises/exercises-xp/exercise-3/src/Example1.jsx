import React from 'react';
import data from './data.json';
    
class Example1 extends React.Component {
  render() {
    return (
      <div>
        <h2>Example Component</h2>
        {data.SocialMedias.map((link, index) => (
          <div key={index}>
            <a href={link} target="_blank">
              {link}
            </a>
          </div>
        ))}
      </div>
    );
  }
}
export default Example1;
