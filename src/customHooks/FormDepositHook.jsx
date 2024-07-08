// FormContext.js
import React, { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { schema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const methods = useForm({
    resolver: yupResolver(schema), // Ensure schema is imported here
  });

  return (
    <FormContext.Provider value={methods}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
