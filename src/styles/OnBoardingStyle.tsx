import {StyleSheet} from 'react-native';

export const OnBoardingStyle = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  layer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  layer_1: {
    backgroundColor: 'transparent',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  layer_2: {
    // zIndex: 10,
    backgroundColor: '#fff',
  },
  imageWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageWrapper_text: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 40,
  },
  // "relative w-full h-1/3 flex items-center justify-center"
  contentWrapper: {
    position: 'relative',
    width: '100%',
    height: '33.33%',
    backgroundColor: '#4F378B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // flex flex-col items-center justify-center px-3 gap-1
  contentText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingLeft: 12,
    paddingRight: 12,
  },
  // font-bold text-[24px] text-white
  contentText_title: {
    fontWeight: '700',
    fontSize: 24,
    color: '#fff',
  },
  // font-normal text-[16px] text-white text-center
  contentText_subtitle: {
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  // " relative w-full h-full flex justify-center items-center"
  processImageBg: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // absolute w-full h-full flex justify-center items-center p-4 flex-1 duration-500 ease-linear
  processIcon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  // "font-bold text-[32px]"
  processText: {
    fontWeight: '600',
    fontSize: 32,
  },
  nextIcon: {position: 'absolute', bottom: 32, right: 24},
  buttonArea: {
    position: 'absolute',
    bottom: 32,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  buttonStart: {
    borderColor: '#fff',
    color: '#fff',
  },
});
