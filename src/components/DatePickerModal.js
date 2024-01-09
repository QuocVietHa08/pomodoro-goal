import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ReactNativeModal from 'react-native-modal';
import { AppTheme, Dimens } from 'src/utils/appConstant';
import DatePicker from 'react-native-date-picker';
import { Button, StyleSheet, View } from 'react-native';
import ButtonIcon from './ButtonIcon';
import moment from 'moment';
import TextView from './TextView';

const BUTTON_WITDTH = (Dimens.width - AppTheme.normalPadding * 4) / 2.6;

const DatePickerModal = (
  {
    defaultDate = moment().toDate(),
    mode = 'date',
    value,
    maximumDate,
    minimumDate,
    title,
  },
  _ref,
) => {
  const modalStatusRef = useRef();
  const onConfirmRef = useRef();
  const [date, setDate] = useState(defaultDate);
  const [isVisible, setIsVisible] = useState(false);

  const onShow = useCallback(
    onConfirm =>
      new Promise(resolve => {
        setIsVisible(true);
        onConfirmRef.current = onConfirm;
        modalStatusRef.current = resolve;
      }),
    [],
  );

  const onHide = useCallback(
    () =>
      new Promise(resolve => {
        setIsVisible(false);
        modalStatusRef.current = resolve;
      }),
    [],
  );

  const onConfirmLocal = useCallback(async () => {
    await onHide();
    onConfirmRef.current?.(date);
  }, [date]);

  const resolveModalStatus = useCallback(() => {
    modalStatusRef.current?.();
    modalStatusRef.current = null;
  }, []);

  const onModalHide = useCallback(() => {
    resolveModalStatus();
  }, []);
  const onModalShow = useCallback(() => {
    resolveModalStatus();
  }, []);

  useImperativeHandle(
    _ref,
    () => ({
      show: onShow,
      hide: onHide,
    }),
    [date],
  );
  return (
    <ReactNativeModal
      useNativeDriver
      hideModalContentWhileAnimating
      backdropColor="black"
      backdropOpacity={0.6}
      isVisible={isVisible}
      onModalHide={onModalHide}
      onModalShow={onModalShow}
      maximumDate={maximumDate}
      minimumDate={minimumDate}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      style={styles.container}
    >
      <View style={styles.content}>
        {!!title && (
          <TextView fontWeight="600" fontSize={AppTheme.fontSize.s18}>
            {title}
          </TextView>
        )}
        <DatePicker
          mode={mode}
          date={date}
          onDateChange={setDate}
          textColor={AppTheme.colors.black}
          theme="light"
        />
        <View style={styles.v1}>
          <ButtonIcon
            onPress={onHide}
            containerStyle={styles.btn1}
            type="inactive"
            text="Cancel"
          />
          <ButtonIcon
            onPress={onConfirmLocal}
            containerStyle={styles.btn1}
            text="Confirm"
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default memo(forwardRef(DatePickerModal));

const styles = StyleSheet.create({
  btn1: {
    width: BUTTON_WITDTH,
  },
  v1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: AppTheme.gapSize.s6,
    width: '100%',
  },
  content: {
    backgroundColor: AppTheme.colors.white,
    borderRadius: AppTheme.gapSize.s12,
    paddingHorizontal: AppTheme.normalPadding,
    paddingBottom: AppTheme.normalPadding,
    paddingTop: 0.8 * AppTheme.normalPadding,
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 0,
    marginBottom: 0,
    paddingHorizontal: AppTheme.normalPadding,
  },
});
