import React from 'react';
import { Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      defaultValue={i18n.language.split('-')[0]}
      onChange={handleChange}
      style={{ width: 100 }}
      variant="borderless"
      options={[
        { value: 'en', label: <Space>🇺🇸 EN</Space> },
        { value: 'uz', label: <Space>🇺🇿 UZ</Space> },
        { value: 'ru', label: <Space>🇷🇺 RU</Space> },
      ]}
    />
  );
};

export default LanguageSwitcher;
