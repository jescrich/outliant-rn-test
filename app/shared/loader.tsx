import React, { useEffect, useRef, useState } from 'react';

import {
  Animated, StyleSheet, View,
} from 'react-native';

export interface LoaderProps {
    size: number;
    maxSize: number;
    color: string;
}

const Loader = (props: LoaderProps) => {
  const { size, maxSize, color } = props;

  const minSize = size;

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      height: maxSize,
      width: maxSize,
    },
    circle: {
      backgroundColor: color,
      width: size,
      height: size,
      borderRadius: maxSize / 2,
      position: 'absolute',

    },
    centerCircle: {
      backgroundColor: color,
      position: 'absolute',
      top: (maxSize - size) / 2,
      left: (maxSize - size) / 2,
      width: size,
      height: size,

    },
  });

  const animationHaloA = useRef(new Animated.Value(0)).current;
  const animationHaloB = useRef(new Animated.Value(0)).current;
  const animationHaloMain = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationHaloMain, {
          toValue: 1,
          useNativeDriver: false,
          duration: 300,
        }),

        Animated.parallel([
          Animated.timing(animationHaloA, {
            toValue: 1,
            useNativeDriver: false,
            duration: 2500,
            delay: 100,
          }),
          Animated.timing(animationHaloB, {
            toValue: 1,
            useNativeDriver: false,
            duration: 2500,
            delay: 500,
          })]),

      ]),
    ).start();
  }, []);

  return (
    <View style={{ ...styles.container }}>

      <Animated.View
        style={[
          styles.container, {
            opacity: animationHaloMain.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }]}
      >
        <>
          <Animated.View
            style={[styles.circle, {
              width: animationHaloA.interpolate({
                inputRange: [0, 1],
                outputRange: [minSize, maxSize],
              }),
              height: animationHaloA.interpolate({
                inputRange: [0, 1],
                outputRange: [minSize, maxSize],
              }),
              opacity: animationHaloA.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0],
              }),
            }]}
          />

          <Animated.View
            style={[styles.circle, {
              width: animationHaloB.interpolate({
                inputRange: [0, 1],
                outputRange: [minSize, maxSize],
              }),
              height: animationHaloB.interpolate({
                inputRange: [0, 1],
                outputRange: [minSize, maxSize],
              }),
              opacity: animationHaloB.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0],
              }),
            }]}
          />
        </>
      </Animated.View>

      <View style={{
        ...styles.circle, ...styles.centerCircle,
      }}
      />
    </View>
  );
};

export default Loader;
