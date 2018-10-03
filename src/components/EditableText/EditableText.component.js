import React from 'react';

class EditableText extends React.Component {
  state = {
    editing: false,
    title: '',
  }

  componentDidMount() {
    const { item } = this.props;
    if (item && item.title) {
      this.setState({
        title: item.title,
      })
    }
  }

  render() {
    const { editing, title } = this.state;
    return (
      <div className="EditableText text" >
        {!editing && (
          <div onClick={this.onFocus}>
            <span className="text">{title}</span>
          </div>
        )}
        {editing && (
          <form onSubmit={(e) => {e.preventDefault()}}>
            <input value={title} onChange={this.onChange} onKeyPress={this.onKeyPress}/>
          </form>
        )}
      </div>
    )
  }

  onKeyPress = (e) => {
    if (e.which == 13 || e.keyCode == 13) {
      this.setState({
        editing: false,
      })
    }
  }

  onChange = (e) => {
    this.setState({
      title: e.target.value,
    })
    this.props.onItemTitleChange(e.target.value, this.props.item)
  }

  onFocus = () => {
    this.setState({
      editing: true,
    })
  }

  onBlur = () => {
    this.setState({
      editing: false,
    })
  }
}

export default EditableText;
