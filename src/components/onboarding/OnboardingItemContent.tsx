import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {OnBoardingStyle} from '../../styles/OnBoardingStyle';
import {OnboardingSlideItem} from '../../types';

export const OnboardingItemContent = ({item}: {item: OnboardingSlideItem}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[OnBoardingStyle.contentText, {width}]}>
      <Text style={OnBoardingStyle.contentText_title}>{item.title}</Text>
      <Text style={OnBoardingStyle.contentText_subtitle}>
        {item.description}
      </Text>
    </View>
  );
};
