import { useTranslation } from 'react-i18next';
import React from 'react';

const translateChildren = (children, t) => {
  if (typeof children === 'string') {
    return t(children);
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(
      children,
      { ...children.props },
      translateChildren(children.props.children, t)
    );
  }

  if (Array.isArray(children)) {
    return children.map((child) => translateChildren(child, t));
  }

  return children;
};

const TranslationProvider = ({ children }) => {
  const { t } = useTranslation();

  const translatedChildren = translateChildren(children, t);

  return <>{translatedChildren}</>;
};

export default TranslationProvider;