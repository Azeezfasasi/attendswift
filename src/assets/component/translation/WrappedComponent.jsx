import { useTranslation } from 'react-i18next';

// Flexible Translated Component
const TranslatedComponent = ({ as: Tag = 'p', children, ...props }) => {
  const { t } = useTranslation();

  return (
    <Tag {...props}>
      {t(children)}
    </Tag>
  );
};

export default TranslatedComponent;

