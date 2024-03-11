import React from 'react';
import styles from './Category.styles';
import { View } from 'react-native';
import TextView from 'src/components/TextView';
import TouchableDebounce from 'src/components/TouchableDebounce';

const CategoryItem = ({ item, onChoose }) => {
  return (
    <TouchableDebounce onPress={() => onChoose(item)}>
      <View style={styles.categoryItemWrapper}>
        <View style={[styles.categoryColor, { backgroundColor: item.color }]} />
        <TextView style={styles.categoryTitle}>{item?.name}</TextView>
      </View>
    </TouchableDebounce>
  );
};

export default CategoryItem;
