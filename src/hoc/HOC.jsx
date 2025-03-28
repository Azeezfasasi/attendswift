import { useTranslation } from 'react-i18next';
import React from 'react';

const TranslationWrapper = (WrappedComponent) => (props) => {
  const { t } = useTranslation();

  // Translate only string props
  const translateProps = (componentProps) => {
    return Object.entries(componentProps).reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'string' ? t(value) : value;
      return acc;
    }, {});
  };

  const translatedProps = translateProps(props);

  return <WrappedComponent {...translatedProps}>{props.children}</WrappedComponent>;
};

export default TranslationWrapper;
