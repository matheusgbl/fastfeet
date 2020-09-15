import React, { useEffect, useRef, useState } from 'react';
import AsyncSelect from 'react-select/async';
import { useField } from '@unform/core';

import api from '../../../services/api';

import { Label } from './styles';

export default function RecipientInput({ name, ...rest }) {
  const [recipients, setRecipients] = useState([]);

  const selectRef = useRef(null);
  const { registerField, defaultValue, fieldName } = useField(name);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/recipients', {
        params: {
          name: '',
        },
      });

      const data = response.data.map(recipient => ({
        value: recipient.id,
        label: recipient.name,
      }));

      setRecipients(data);
    }
    loadData();
  }, []);

  const filterColors = inputValue => {
    return recipients.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promisseOptions = inputValue =>
    new Promise(resolve => {
      resolve(filterColors(inputValue));
    });

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Label>
      <AsyncSelect
        cacheOptions
        defaultOptions={recipients}
        placeholder="Select..."
        loadOptions={promisseOptions}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
    </Label>
  );
}
