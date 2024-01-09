import { Dimensions, Platform } from 'react-native';
// import Config from 'react-native-config';
const Dimens = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
const [
  shortDimension,
  // longDimension
] =
  Dimens.width < Dimens.height
    ? [Dimens.width, Dimens.height]
    : [Dimens.height, Dimens.width];
// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const TypeScaleSize = {
  FONT_SIZE: 'fontSize',
  PADDING: 'padding',
  ICON: 'icon',
  HEIGHT: 'height',
};

const scaleSize = (size, type = 'fontSize', factor = 0.5) => {
  let appSize = size;
  switch (type) {
    case 'fontSize':
      appSize -= 2;
      break;
    case 'padding':
      appSize -= 4;
      break;
    case 'icon':
      appSize -= 2;
      break;
    case 'height':
      break;
    default:
      break;
  }
  const extraSize = 2;
  const scale = (shortDimension / guidelineBaseWidth) * appSize;
  return appSize + (scale - appSize) * factor + extraSize;
};

const isIos = Platform.OS == 'ios';
const isPad = Platform.isPad;

const hitSlop = {
  top: 10,
  left: 10,
  bottom: 10,
  right: 10,
};

const AxiosErrorMessages = {
  request_timeout: 'request_timeout',
  something_went_wrong: 'something_went_wrong',
  unknown_error: 'unknown_error',
  invalid_data: 'invalid_data',
};

const RequestStatus = {
  Request: 'Request',
  Success: 'Success',
  Failure: 'Failure',
  Complete: 'Complete',
};

const DATE_FORMAT = {
  ddmmyyyy: 'DD/MM/YYYY',
  ddMMMYYYY: 'DD MMM YYYY',
  dddd: 'dddd',
  MMYYYY: 'MM/YYYY',
  YYYYMM: 'YYYY-MM',
  MMMYYYY: 'MMM YYYY',
  HHMM: 'HH:mm',
  HHMMSS: 'HH:mm:ss',
  ddmmyyyyHHmm: 'DD/MM/YYYY, HH:mm',
  YYYYmmdd: 'YYYY-MM-DD',
  YYYYmmddHHmmss: 'YYYY-MM-DD HH:mm:ss',
};

const AxiosConfig = {
  API_TIMEOUT: 30000,
  // BASE_URL,
  // BASE_BACKEND_URL,
  AXIOS_STATUS_CODE: {
    RESPONSE_SUCCESS: 200,
    RESPONSE_SUCCESS_201: 201,
    EXPIRED_SESSION: 6,
    SYSTEM_ERROR: -1,
    TIMEOUT: 3000,
    UNKNOWN_ERROR: 600,
    INTERNET_ERROR: 601,
    CONFIG_ERROR: 1001,
    HANDLE_ERROR: 1000,
    CANCEL_REQUEST_ERROR: 1002,
    UNAUTHORIZED: 401,
    INVALID_TIMESTAMP: 402,
    PERMISSION_DENIED: 403,
    NOT_FOUND: 404,
  },
};

const PHOTO_PERMISSION_TYPE = {
  CAMERA: 'CAMERA',
  LIBRARY: 'LIBRARY',
};

const AppFont = {
  Montserrat_Bold: 'Montserrat-Bold',
  Montserrat_ExtraBold: 'Montserrat-ExtraBold',
  Montserrat_Medium: 'Montserrat-Medium',
  Montserrat_Regular: 'Montserrat-Regular',
  Montserrat_Semibold: 'Montserrat-SemiBold',
  OpenSans: 'OpenSans',
  OpenSans_Regular: 'OpenSans-Regular',
  OpenSans_Semibold: 'OpenSans-Semibold',
  OpenSans_Bold: 'OpenSans-Bold',
};

const ButtonType = {
  DISABLE: 'disabled',
  CANCEL: 'cancel',
  SECONDARY: 'secondary',
  PREVIOUS: 'previous',
  PRIMARY: 'primary',
};

const AppTheme = {
  inputHeight: isPad ? scaleSize(60, 'height') : scaleSize(48, 'height'),
  buttonHeight: isPad ? scaleSize(60, 'height') : scaleSize(48, 'height'),
  drawerItemHeight: isPad ? scaleSize(70, 'height') : scaleSize(48, 'height'),
  basicHeaderHeight: scaleSize(48, 'height'),
  dotSize: scaleSize(8, 'height'),
  bottomTabHeight: Platform.isPad ? 74 : Dimens.width / 5.6,
  iconSize: {
    s24: scaleSize(24, 'icon'),
    s20: scaleSize(20, 'icon'),
  },
  normalPadding: scaleSize(20, 'padding'),
  defaultShadow: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  gapSize: {
    s2: scaleSize(2, ''),
    s4: scaleSize(4, ''),
    s5: scaleSize(5, ''),
    s6: scaleSize(6, ''),
    s8: scaleSize(8, ''),
    s10: scaleSize(10, ''),
    s12: scaleSize(12, ''),
    s14: scaleSize(14, ''),
    s15: scaleSize(15, ''),
    s16: scaleSize(16, ''),
    s18: scaleSize(18, ''),
    s20: scaleSize(20, ''),
    s24: scaleSize(24, ''),
    s27: scaleSize(27, ''),
    s30: scaleSize(30, ''),
    s35: scaleSize(35, ''),
    s40: scaleSize(40, ''),
    s48: scaleSize(48, ''),
    s52: scaleSize(52, ''),
    s56: scaleSize(56, ''),
    s60: scaleSize(60, ''),
  },
  fontSize: {
    s10: scaleSize(10),
    s11: scaleSize(11),
    s12: scaleSize(12),
    s13: scaleSize(13),
    s14: scaleSize(14),
    s15: scaleSize(15),
    s16: scaleSize(16),
    s17: scaleSize(17),
    s18: scaleSize(18),
    s19: scaleSize(19),
    s20: scaleSize(20),
    s22: scaleSize(22),
    s23: scaleSize(23),
    s24: scaleSize(24),
    s25: scaleSize(25),
    s26: scaleSize(26),
    s28: scaleSize(28),
    s30: scaleSize(30),
    s32: scaleSize(32),
    s34: scaleSize(34),
    s40: scaleSize(40),
    s50: scaleSize(50),
    s54: scaleSize(54),
    s57: scaleSize(57),
    defaultFontSize: scaleSize(14),
  },
  fontFamily: 'Open Sans',
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    black_8: '#B3B3B3',
    neutral_10: '#EDEDED',
    neutral_20: '#DBDBDB',
    neutral_30: '#CACACA',
    neutral_40: '#B8B8B8',
    neutral_50: '#A6A6A6',
    neutral_60: '#949494',
    neutral_70: '#828282',
    neutral_80: '#717171',
    neutral_90: '#5F5F5F',
    neutral_100: '#4D4D4D',
    primary_1: '#ff585d',
    primary_2: '#7DBBCE',
    primary_3: '#8BC2D4',
    primary_4: '#8BC2D4',
    primary_5: '#8BC2D4',
    primary_6: '#8BC2D4',
    primary_7: '#C5E1E9',
    primary_8: '#D3E8EF',
    primary_9: '#E2F0F4',
    primary_10: '#F0F7FA',
    primary_11: '#F8FBFC',
    warning_10: '#FAEED5',
    warning_20: '#F3D595',
    warning_40: '#E7AC2B',
    warning_60: '#976400',
    warning_80: '#724B00',
    warning_100: '#4D2900',
    success_10: '#E8FBEA',
    success_20: '#C6EAC9',
    success_40: '#8FC594',
    success_60: '#00632B',
    success_80: '#00401C',
    success_100: '#002611',
    error_10: '#FFEBEB',
    error_20: '#FC9595',
    error_40: '#E24B4B',
    error_60: '#B01212',
    error_80: '#8C0000',
    error_100: '#660000',
    gradientTop: '#C5E1E9',
    gradientBottom: '#8BC2D4',
    disableBack: '#CCCCCC',
    grey1: '#F4F4F4',
    grey_50: '#FAFAFA',
    red: '#F15169',
    secondary: '#00CDC2',
    secondary20: '#00CDC233',
    secondary40: '#00CDC240',
  },
};

const VOStatus = {
  NOT_PAID: 'Not Paid',
  PAID: 'Paid',
};
const mTopContainer = 40;

export {
  AppTheme,
  Dimens,
  isIos,
  AxiosConfig,
  AxiosErrorMessages,
  hitSlop,
  RequestStatus,
  scaleSize,
  DATE_FORMAT,
  PHOTO_PERMISSION_TYPE,
  AppFont,
  VOStatus,
  mTopContainer,
  TypeScaleSize,
  ButtonType,
};
