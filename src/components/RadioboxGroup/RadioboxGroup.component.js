import React from 'react';

class RadioboxGroup extends React.Component {
  render() {
    const { cols } = this.props;
    return (
      <span className="radioboxgroup">
        {cols && cols.length > 0 && cols.map(col => (
          <span className="radiobox" key={col.id}>
            <input type="radio" />
          </span>
        ))}
      </span>
    )
  }
}

export default RadioboxGroup;