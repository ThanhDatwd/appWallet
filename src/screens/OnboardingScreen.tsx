/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon';
import SettingIcon from '../../assets/icons/SettingIcon';
import {OnBoardingItem} from '../components/onboarding/OnboardingItem';
import {onBoardingSlide} from '../constants';
import {GlobalStyle} from '../styles/GlobalStyle';
import {OnBoardingStyle} from '../styles/OnBoardingStyle';
export const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const [rotation, setRotation] = useState(0);
  const rotateValue = useRef(new Animated.Value(0)).current;
  const translateXValue = useRef(new Animated.Value(0)).current;

  const slideImageRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const [buttonAnimation] = useState(new Animated.Value(0));

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
  };
  const handleScrollTo = () => {
    handleButtonPress(currentIndex - 1, false);
  };

  const handleButtonPress = (
    currentIndex: number,
    isNextSlide: boolean = true,
  ) => {
    if (currentIndex < onBoardingSlide.length - 1) {
      isNextSlide && handleNextSlide();

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
      setCurrentIndex(0);
    }
  };

  const spin = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (currentIndex >= 2) {
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [currentIndex]);

  const buttonTranslateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [32, 0], // Hiển thị lên 32px từ dưới
  });

  return (
    <>
      <View style={OnBoardingStyle.container}>
        <View style={[OnBoardingStyle.layer, OnBoardingStyle.layer_2]}>
          <Animated.FlatList
            data={onBoardingSlide}
            renderItem={({item}) => (
              <OnBoardingItem
                item={item}
              />
            )}
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
            scrollEventThrottle={16}
            onMomentumScrollBegin={() => handleScrollTo()}
          />
        </View>
        <View style={[OnBoardingStyle.layer, OnBoardingStyle.layer_1]}>
          <View
            style={[
              OnBoardingStyle.contentWrapper,
              {backgroundColor: 'transparent'},
            ]}>
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
              <Animated.View
                style={[
                  OnBoardingStyle.buttonArea,
                  {transform: [{translateY: buttonTranslateY}]},
                ]}>
                <TouchableOpacity onPress={() => navigation.navigate('Start')}>
                  <Text
                    style={[GlobalStyle.button, OnBoardingStyle.buttonStart]}>
                    Start
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}
            {/*  ITEM CONTENT */}
          </View>
        </View>
      </View>
    </>
  );
};
