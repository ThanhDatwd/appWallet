/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';
import {styled} from 'nativewind';
import {useNavigation} from '@react-navigation/native';
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);

export const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <StyledView className="flex-1 items-center justify-center">
        <StyledText className="font-bold text-[32px]">
          Try editing me! 🎉
        </StyledText>
        <StyledButton
          title="Go to onboarding"
          onPress={() => navigation.navigate('OnBoarding')}
        />
      </StyledView>
    </SafeAreaView>
  );
};
