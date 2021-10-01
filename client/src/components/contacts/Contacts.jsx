import React, { useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactItems from "./ContactItems";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please use the form to add a contact.</h4>;
  }
  return (
    <>
      <TransitionGroup>
        {contacts !== null && !loading ? (
          <>
            {filtered !== null
              ? filtered.map((contact) => (
                  <CSSTransition
                    key={contact._id}
                    timeout={500}
                    classNames="item"
                  >
                    <ContactItems key={contact._id} contact={contact} />
                  </CSSTransition>
                ))
              : contacts.map((contact) => (
                  <CSSTransition
                    key={contact._id}
                    timeout={500}
                    classNames="item"
                  >
                    <ContactItems key={contact._id} contact={contact} />
                  </CSSTransition>
                ))}
          </>
        ) : (
          <Spinner />
        )}
      </TransitionGroup>
    </>
  );
};

export default Contacts;
