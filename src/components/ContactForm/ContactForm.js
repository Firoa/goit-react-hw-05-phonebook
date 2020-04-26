import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button/Button';
import styles from './ContactForm.module.css';
import { CSSTransition } from 'react-transition-group';
import AllertBlock from '../AlertBlock/AlertBlock';
import slideTitle from './slideTitle.module.css';
import slideAllert from './animationSlide.module.css';
class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
      id: '',
      startFlag: false,
      allert: { flag: false },
    };
    this.formId = uuidv4();
  }

  componentDidMount() {
    this.setState({ startFlag: true });
  }
  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleAddContact = e => {
    e.preventDefault();
    const flag = this.props.onAddSubmit({ ...this.state, ...{ id: uuidv4() } });
    this.setState({ allert: flag });
    setTimeout(() => {
      this.setState(prevState => {
        return {
          allert: { ...prevState.allert, flag: false },
        };
      });
    }, 1000);
    this.resetState();
  };

  resetState = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number, startFlag, allert } = this.state;
    return (
      <div>
        <form
          onSubmit={this.handleAddContact}
          htmlFor={this.formId}
          className={styles.contact_form}
        >
          <CSSTransition in={startFlag} timeout={500} classNames={slideTitle}>
            <h2 className={styles.title}>PhoneBook</h2>
          </CSSTransition>
          <label className={styles.label}>
            <h3 className={styles.title}>Name</h3>
            <CSSTransition
              in={allert.flag}
              timeout={250}
              classNames={slideAllert}
              unmountOnExit
            >
              <AllertBlock name={allert.name} />
            </CSSTransition>
            <input
              type="text"
              placeholder="Enter friend"
              value={name}
              onChange={this.handleChange}
              id={this.formId}
              name="name"
              className={styles.FormInput}
            ></input>
          </label>
          <label className={styles.label}>
            <h3 className={styles.title}>Number</h3>
            <input
              type="text"
              placeholder="Enter number"
              value={number}
              onChange={this.handleChange}
              id={this.formId}
              name="number"
              className={styles.FormInput}
            ></input>
          </label>
          <Button type="submit" text="Add contact" />
        </form>
      </div>
    );
  }
}

export default ContactForm;
