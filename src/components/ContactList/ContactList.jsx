import PropTypes from 'prop-types';

import { ContactElement } from '../ContactElement/ContactElement';

export const ContactList = ({ contacts, onClick }) => {
  const contactsArray = contacts()
  return (
    <ol>
      {contactsArray?.map(el => {
        return <ContactElement onClick={onClick} key={el.id} el={el} />;
      })}
    </ol>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};