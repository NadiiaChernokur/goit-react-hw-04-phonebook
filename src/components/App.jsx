import { useEffect, useState } from 'react';
import { ContactList } from './Contactlist/Contactlist';
import { Filter } from './Filter/Filter';
import { ContactForm } from './Contactform/Contactform';
import { nanoid } from 'nanoid';
import { Container, Head, Head2 } from './Appstyles/App.styles';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([]);
  const [isOneRender, setOneRender] = useState(true);

  useEffect(() => {
    if (isOneRender) {
      setOneRender(false);
      return;
    }

    if (filter.length === 0) {
      localStorage.setItem('Contacts', JSON.stringify(contacts));
      return;
    }
  }, [contacts, filter, isOneRender]);

  useEffect(() => {
    const getLocalStorage = localStorage.getItem('Contacts');
    const getLocalStoragePars = JSON.parse(getLocalStorage);

    if (getLocalStoragePars) {
      setContacts([...getLocalStoragePars]);
    }
  }, []);

  const onSubmitButton = formValue => {
    const surchName = contacts.map(contactName => contactName.name);
    if (surchName.includes(formValue.name)) {
      alert(`${formValue.name} is already in contacts`);
      return;
    }
    if (formValue.name === '' || formValue.number === '') {
      alert(`There are empty fields`);
      return;
    }

    setContacts(prev => [
      ...prev,
      {
        id: nanoid(),
        ...formValue,
      },
    ]);
  };

  const changeFilter = newArrey => {
    setFilter(newArrey);
  };

  const deliteContact = id => {
    setContacts(contacts.filter(item => item.id !== id));
  };

  const visibleArreyFilter = () => {
    return contacts.filter(item => {
      const visibleArrey = item.name
        .toLowerCase()
        .includes(filter.toLowerCase());
      return visibleArrey;
    });
  };

  return (
    <Container>
      <Head>Phonebook</Head>
      <ContactForm submitButton={onSubmitButton} />

      <Head2>Contacts</Head2>
      <Filter filter={filter} change={changeFilter} />
      <ContactList items={visibleArreyFilter()} onDelite={deliteContact} />
    </Container>
  );
};
