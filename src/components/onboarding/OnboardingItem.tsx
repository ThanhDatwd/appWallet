/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { View, useWindowDimensions } from 'react-native';

import { OnBoardingStyle } from '../../styles/OnBoardingStyle';
import { OnboardingSlideItem } from '../../types';
import { OnboardingItemContent } from './OnboardingItemContent';
import { OnboardingItemImage } from './OnboardingItemImage';

interface IProp {
  item: OnboardingSlideItem;
}
export const OnBoardingItem = ({item}: IProp) => {
  const {width} = useWindowDimensions();

  return (
    <>
      <View style={[OnBoardingStyle.container, {width}]}>
        <OnboardingItemImage item={item} />

        <View style={OnBoardingStyle.contentWrapper}>
          {/*  ITEM CONTENT */}
          <OnboardingItemContent item={item} />

          {/* {currentSlide < 2 && (
            <TouchableOpacity style={OnBoardingStyle.nextIcon} onPress={onScroll}>
              <View>
                <ArrowRightIcon />
              </View>
            </TouchableOpacity>
          )}
          {currentSlide >= 2 && (
            <View style={OnBoardingStyle.buttonArea}>
              <TouchableOpacity >
                <Text style={[GlobalStyle.button, OnBoardingStyle.buttonStart]}>
                  Start
                </Text>
              </TouchableOpacity>
            </View>
          )} */}
        </View>
      </View>
    </>
  );
};
