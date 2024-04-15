import React from 'react';
import {View, Text, Image, useWindowDimensions} from 'react-native';
import {OnBoardingStyle} from '../../styles/OnBoardingStyle';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OnboardingSlideItem} from '../../types';

export const OnboardingItemImage = ({item}: {item: OnboardingSlideItem}) => {
  const {width} = useWindowDimensions();
  return (
    <SafeAreaView>
      <View style={[OnBoardingStyle.imageWrapper, {width}]}>
        <Text style={OnBoardingStyle.imageWrapper_text}>{item.topic}</Text>
        <Image source={item.uri} />
      </View>
    </SafeAreaView>
  );
};
