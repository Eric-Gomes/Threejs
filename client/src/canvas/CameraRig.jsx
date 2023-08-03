import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';


const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  // use frame hook to execute code on every rendered frame
  useFrame((state, delta) => {
    // create breakpoints for screen sizes
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set initial position of model
    let targetPosition = [-0.4, 0, 2];
    // if statement for screen sizing on different devices for model
    if(snap.intro) {
      if(isBreakpoint) targetPosition = [0, 0, 2];
      if(isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if(isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2];
    }

    //set model camera psotion
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)


    //set model rotation smoothly, call as function and pass properties
    easing.dampE(
    group.current.rotation,
    [state.pointer.y / 10, -state.pointer.x / 5, 0],
    0.25, delta )
  })

  

  return <group ref={group}>{children}</group>
  
}

export default CameraRig