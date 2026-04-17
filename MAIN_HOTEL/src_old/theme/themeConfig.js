import { theme } from 'antd';

export const themeConfig = {
  token: {
    colorPrimary: '#111111',
    borderRadius: 0,
    fontFamily: 'Inter, sans-serif',
    colorBgContainer: '#ffffff',
    colorTextBase: '#111111',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerPadding: '0 24px',
      siderBg: '#ffffff',
    },
    Card: {
      paddingLG: 24,
      borderRadiusLG: 0,
    },
    Button: {
      borderRadius: 0,
      controlHeight: 44,
    }
  },
  algorithm: theme.defaultAlgorithm,
};
