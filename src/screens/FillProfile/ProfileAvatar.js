import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextView from 'src/components/TextView';
import IconComponent from 'src/components/IconComponent';
import IconAvatar from 'src/assets/images/login/ic_avatar.png';
import FastImage from 'react-native-fast-image';
import IconEdit from 'src/assets/images/login/ic_edit.png';
import TouchableDebounce from 'src/components/TouchableDebounce';

const ProfileAvatar = ({ onShowImage, uri, onEditAvatar, info }) => {
  return (
    <View style={styles.container}>
      {!uri && (
        <FastImage
          source={IconAvatar}
          style={{
            width: 150,
            height: 150,
          }}
        />
      )}
      <TouchableDebounce onPress={onEditAvatar}>
        <FastImage source={IconEdit} style={styles.iconEdit} />
      </TouchableDebounce>
      {info && (
        <View style={styles.infoWrap}>
          <TextView style={{ fontSize: 20, fontWeight: 'bold' }}>
            {info.name}
          </TextView>
          <TextView style={{ fontSize: 14, color: '#999' }}>
            {info.email}
          </TextView>
        </View>
      )}
    </View>
  );
};

export default ProfileAvatar;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    position: 'relative',
  },
  iconEdit: {
    width: 25,
    height: 25,
    position: 'absolute',
    bottom: 10,
    right: 20,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  infoWrap: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
