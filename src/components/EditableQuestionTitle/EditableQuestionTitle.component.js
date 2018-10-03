import React from 'react';
import { titleStorage } from '../../utils/storage.utils';

class EditableQuestionTitle extends React.Component {
  state = {
    editing: false,
    currentTitle: 'DefaultTitle'
  }

  componentDidMount() {
    this.setState({
      currentTitle: titleStorage.fetch(),
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentTitle !== this.state.currentTitle) {
      titleStorage.save(this.state.currentTitle);
    }
  }

  onEdit = () => {
    this.setState({
      editing: true,
    })
  }

  onSave = () => {
    this.setState({
      editing: false,
    })
  }

  onChange = (e) => {
    this.setState({
      currentTitle: e.target.value
    })
  }

  render() {
    const { editing, currentTitle } = this.state;
    return (
      <div className="EditableQuestionTitle">
        {!editing && (
          <div>
            <span className="text">{currentTitle}</span>
            <i onClick={this.onEdit} className="edit fas fa-edit"></i>
          </div>
        )}
        {editing && (
          <form>
            <input placeholder="Question title" value={currentTitle} onChange={this.onChange} />
            <i onClick={this.onSave} className="save fas fa-save"></i>
          </form>
        )}
      </div>
    )
  }
}

export default EditableQuestionTitle;