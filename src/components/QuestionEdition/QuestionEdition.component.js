import React from 'react';
import { localeStore } from '../../utils/storage.utils';
import EditableQuestionTitle from '../EditableQuestionTitle/EditableQuestionTitle.component';
import EditableText from '../EditableText/EditableText.component';
import RadioboxGroup from '../RadioboxGroup/RadioboxGroup.component';
import uuid from 'uuid/v1';

class QuestionEdition extends React.Component {
  state = {
    itemsList: [],
    colsList: [],
    rowsList: [],
    longestRow: {},
    longestCol: {},
  }

  componentDidMount() {
    const items = localeStore.fetch();
    this.setState({
      itemsList: items,
      colsList: items.filter(item => item.type === 'col'),
      rowsList: items.filter(item => item.type === 'row'),
      longestCol: this.findLongestItem(items.filter(item => item.type === 'col')).title,
      longestRow: this.findLongestItem(items.filter(item => item.type === 'row')).title,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.itemsList.length !== this.state.itemsList.legth) {
      localeStore.save(this.state.itemsList);
    }
  }

  render() {
    const { colsList, rowsList, longestCol, longestRow } = this.state;
    return (
      <div className="questionEdition">
        <EditableQuestionTitle />
        <div className="colContainer">
          {colsList.length > 0 && colsList.map(col => (
            <div key={col.id} className="col">
              <span className="destroy minus" onClick={() => this.removeItem(col)}><i className="far fa-trash-alt"></i></span>
              <span className="image"></span>
              <EditableText onItemTitleChange={this.onItemTitleChange} item={col} />
            </div>
          ))}
        </div>
        <i onClick={this.addCol} className="fas fa-plus plus"></i>
        <div className="rowContainer">
          {rowsList.length > 0 && rowsList.map(row => (
             <div key={row.id} className="row">
              <span className="minus" onClick={() => this.removeItem(row)}><i className="far fa-trash-alt"></i></span>
              <span className="image"></span>
              <EditableText onItemTitleChange={this.onItemTitleChange} item={row} />
              <RadioboxGroup cols={colsList} />
            </div>
          ))}
        </div>
        <i onClick={this.addRow} className="fas fa-plus plus row-plus"></i>
        <p>{`longest row label is ${longestRow}`}</p>
        <p>{`longest col label is ${longestCol}`}</p>
        <p>{`number of cols is ${colsList.length}`}</p>
        <p>{`number of rows is ${rowsList.length}`}</p>
      </div>
    );
  }

  findLongestItem = (arr) => {
    return arr.reduce((a, b) => {
      return a.title.length > b.title.length ? a : b; 
    });
  }

  onItemTitleChange = (title, el) => {
    localeStore.save(this.state.itemsList.map(item => 
      (item.id === el.id) ? {...item, title} : item
    ))

    if (el.type === 'row') {
      if (title.length > this.state.longestRow.length) {
        this.setState({
          longestRow: title,
        })
      }
    }

    if (el.type === 'col') {
      if (title.length > this.state.longestCol.length) {
        this.setState({
          longestCol: title,
        })
      }
    }
  }

  addCol = () => {
    let id = this.state.colsList.length + 1;
    const newColItem = {
      id: uuid(),
      type: "col",
      title: "col" + id,
    }
    this.setState({
      itemsList: [...this.state.itemsList, newColItem],
      colsList: [...this.state.colsList, newColItem],
    });
  }

  addRow = () => {
    let id = this.state.rowsList.length + 1;
    const newRowItem = {
      id: uuid(),
      type: "row",
      title: "row" + id,
    }
    this.setState({
      itemsList: [...this.state.itemsList, newRowItem],
      rowsList: [...this.state.rowsList, newRowItem],
    });
  }

  removeItem = (item) => {
    const itemsList = [...this.state.itemsList];
    this.setState({
      itemsList: itemsList.filter(el => el.id !== item.id)
    }, () => {
      this.setState({
        colsList: this.state.itemsList.filter(item => item.type === 'col'),
        rowsList: this.state.itemsList.filter(item => item.type === 'row'),
      })
    })
  }

}

export default QuestionEdition;
