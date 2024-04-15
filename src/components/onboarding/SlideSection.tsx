/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SettingIcon from '../../assets/icons/SettingIcon';
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon';
import {OnBoardingStyle} from '../styles/OnBoardingStyle';
import {OnboardingItemContent} from '../components/onboarding/OnboardingItemContent';
import {OnboardingItemImage} from '../components/onboarding/OnboardingItemImage';
import {onBoardingSlide} from '../constants';
import {GlobalStyle} from '../styles/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
export const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const [rotation, setRotation] = useState(0);
  const rotateValue = useRef(new Animated.Value(0)).current;
  const translateXValue = useRef(new Animated.Value(0)).current;

  const slideImageRef = useRef<any>(null);
  const slideContentRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: any}) => {
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const handleNextSlide = () => {
    slideImageRef.current.scrollToIndex({
      index: currentIndex + 1,
    });
    slideContentRef.current.scrollToIndex({
      index: currentIndex + 1,
    });
  };
  const handleScrollTo = () => {
    slideImageRef.current.scrollToIndex({
      index: currentIndex,
    });
    slideContentRef.current.scrollToIndex({
      index: currentIndex,
    });
    handleButtonPress(currentIndex - 1);
  };

  const handleButtonPress = (currentIndex: number) => {
    if (currentIndex < onBoardingSlide.length - 1) {
      // handleNextSlide();

      const newRotation = rotation + 90;
      setRotation(newRotation);

      const rotateAnimation = Animated.timing(rotateValue, {
        toValue: newRotation,
        duration: 300,
        useNativeDriver: true,
      });

      const containerWidth = Dimensions.get('window').width;

      const translateXAnimation = Animated.timing(translateXValue, {
        toValue: (containerWidth * (currentIndex + 1)) / 3,
        duration: 300,
        useNativeDriver: true,
      });

      Animated.parallel([rotateAnimation, translateXAnimation]).start(() => {});
    } else {
      setCurrentIndex(-1);
    }
  };

  const spin = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>
      <View style={OnBoardingStyle.container}>
        <Animated.FlatList
          data={onBoardingSlide}
          renderItem={({item}) => <OnboardingItemImage item={item} />}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideImageRef}
          // decelerationRate={0}
          // scrollEventThrottle={16}
          onMomentumScrollBegin={() => handleScrollTo()}
        />

        <View style={OnBoardingStyle.contentWrapper}>
          <Animated.View
            style={{
              position: 'absolute',
              width: '33.33%',
              left: 0,
              top: 0,
              aspectRatio: '1/1',
              transform: [{translateX: translateXValue}, {translateY: -71.5}],
            }}>
            <ImageBackground
              source={require('../../assets/images/bgSetting.png')}
              resizeMode="contain"
              style={OnBoardingStyle.processImageBg}>
              <Animated.View
                style={[
                  OnBoardingStyle.processIcon,
                  {transform: [{rotate: spin}]},
                ]}>
                <SettingIcon />
              </Animated.View>
              <Text style={OnBoardingStyle.processText}>
                {currentIndex + 1}
              </Text>
            </ImageBackground>
          </Animated.View>
          {/*  ITEM CONTENT */}
          <Animated.FlatList
            scrollEventThrottle={32}
            data={onBoardingSlide}
            renderItem={({item}) => <OnboardingItemContent item={item} />}
            horizontal
            showsHorizontalScrollIndicator
            pagingEnabled
            bounces={false}
            keyExtractor={item => item.id}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slideContentRef}
            onMomentumScrollBegin={() => handleScrollTo()}
          />
          {currentIndex < 2 && (
            <TouchableOpacity
              style={OnBoardingStyle.nextIcon}
              onPress={() => handleButtonPress(currentIndex)}>
              <View>
                <ArrowRightIcon />
              </View>
            </TouchableOpacity>
          )}
          {currentIndex >= 2 && (
            <View style={OnBoardingStyle.buttonArea}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={[GlobalStyle.button, OnBoardingStyle.buttonStart]}>
                  Start
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
};
