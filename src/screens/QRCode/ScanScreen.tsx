//

import React, { useEffect, useState} from 'react';

import {

    StyleSheet,

     Alert
} from 'react-native';



import {Camera, Code, useCameraDevice, useCameraPermission, useCodeScanner} from "react-native-vision-camera";



export const ScanScreen = () => {
    const { hasPermission, requestPermission } = useCameraPermission()

    const device = useCameraDevice('back')

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes: Code[]) => {
            console.log('Scanned codes:', codes);
            if (codes.length > 0) {
                const scannedCode = codes[0].value;
                Alert.alert(`${scannedCode}`);
                console.log('Scanned code full object:', scannedCode);
            }
        }
    });
    useEffect(() => {
        requestPermission()
    }, []);
    if (!hasPermission) return (
        <text>error</text>
    );

    if (device == null) return (<view> <text>error</text> </view>);


    return (
        <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner= {codeScanner}
        />
    )
};

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});
