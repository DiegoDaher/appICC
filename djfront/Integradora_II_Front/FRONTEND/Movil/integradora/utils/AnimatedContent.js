import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import PropTypes from "prop-types";

const AnimatedContent = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 800,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  delay = 0,
  onComplete,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(initialOpacity)).current;
  const scaleValue = useRef(new Animated.Value(scale)).current;

  useEffect(() => {
    const offset = reverse ? -distance : distance;
    
    // Configurar valores iniciales
    animatedValue.setValue(offset);
    if (animateOpacity) {
      opacityValue.setValue(initialOpacity);
    }
    scaleValue.setValue(scale);

    // Crear animación
    const animations = [];
    
    // Animación de posición
    animations.push(
      Animated.timing(animatedValue, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      })
    );

    // Animación de opacidad
    if (animateOpacity) {
      animations.push(
        Animated.timing(opacityValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        })
      );
    }

    // Animación de escala
    if (scale !== 1) {
      animations.push(
        Animated.timing(scaleValue, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        })
      );
    }

    // Ejecutar animaciones en paralelo con delay
    const parallelAnimation = Animated.parallel(animations);
    
    const executeAnimation = () => {
      parallelAnimation.start(() => {
        if (onComplete) {
          onComplete();
        }
      });
    };

    if (delay > 0) {
      setTimeout(executeAnimation, delay);
    } else {
      executeAnimation();
    }

    // Cleanup no es necesario en React Native Animated
    return () => {
      animatedValue.stopAnimation();
      opacityValue.stopAnimation();
      scaleValue.stopAnimation();
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    initialOpacity,
    animateOpacity,
    scale,
    delay,
    onComplete,
  ]);

  const getTransform = () => {
    const transforms = [];
    
    if (direction === "horizontal") {
      transforms.push({ translateX: animatedValue });
    } else {
      transforms.push({ translateY: animatedValue });
    }
    
    if (scale !== 1) {
      transforms.push({ scale: scaleValue });
    }
    
    return transforms;
  };

  return (
    <Animated.View
      style={{
        opacity: animateOpacity ? opacityValue : 1,
        transform: getTransform(),
        
      }}
    >
      {children}
    </Animated.View>
  );
};

// PropTypes para validación de props
AnimatedContent.propTypes = {
  children: PropTypes.node.isRequired,
  distance: PropTypes.number,
  direction: PropTypes.oneOf(["vertical", "horizontal"]),
  reverse: PropTypes.bool,
  duration: PropTypes.number,
  initialOpacity: PropTypes.number,
  animateOpacity: PropTypes.bool,
  scale: PropTypes.number,
  delay: PropTypes.number,
  onComplete: PropTypes.func,
};

export default AnimatedContent;
