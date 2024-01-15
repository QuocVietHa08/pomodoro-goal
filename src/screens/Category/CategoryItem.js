import React from 'react';
import styles from './Category.styles';
import { View } from 'react-native';
import TextView from 'src/components/TextView';

const CategoryItem = ({ item }) => {
  return (
    <View style={styles.categoryItemWrapper}>
      <View style={[styles.categoryColor, { backgroundColor: item.color }]} />
      <TextView style={styles.categoryTitle}>{item.label}</TextView>
    </View>
  );
};

export default CategoryItem;
