import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import styles from './App.module.css';
import Filter from '../Filter/Filter';
import { CSSTransition } from 'react-transition-group';
import slide from '../ContactList/slide.module.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: '',
      allert: { flag: false, name: null },
    };

    this.formId = uuidv4();
  }

  componentDidMount() {
    const persistedContacts = localStorage.getItem('contacts');
    if (!!persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = data => {
    const flag = this.state.contacts.find(({ name }) => name === data.name);
    if (flag !== undefined) {
      return { flag: true, name: flag.name };
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, data],
      };
    });
    return { flag: false };
  };

  handleDeleteContact = key => {
    const newState = this.state.contacts.filter(({ id }) => id !== key);
    this.setState({ contacts: newState });
  };

  handleFilter = data => {
    this.setState({ filter: data });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={styles.app}>
        <ContactForm onAddSubmit={this.handleAddContact} />
        <CSSTransition
          in={!!(contacts.length > 1)}
          timeout={250}
          classNames={slide}
          unmountOnExit
        >
          <Filter onChange={this.handleFilter} />
        </CSSTransition>
        <ContactList
          listData={contacts}
          filterKey={filter}
          callbackfunc={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
