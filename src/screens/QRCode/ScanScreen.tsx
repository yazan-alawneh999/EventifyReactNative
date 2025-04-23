//

import React, { useEffect, useState} from 'react';

import {
    StyleSheet,
    Alert,
    Text,
    View, SafeAreaView, ActivityIndicator, StatusBar
} from 'react-native';



import {Camera, Code, useCameraDevice, useCameraPermission, useCodeScanner} from "react-native-vision-camera";
import {api, BASE_URL} from "../Api.tsx";
import SuccessDialog, {SuccessDialogWithAction} from "../../components/SucesssPopupDialog";



export const ScanScreen = ({navigation}) => {
    const { hasPermission, requestPermission } = useCameraPermission()
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const device = useCameraDevice('back')
    const onConfirm = ()=>{
        navigation.navigate('list');
    }
    async function checkIn(scannedCode: string) {
        setLoading(true);
        try {
            const response = await api.post(`${BASE_URL}/api/BuyTicket/by-qrcode`, scannedCode);

            if (response.status >= 200 && response.status < 300) {
                setLoading(false);
                setShowDialog(true);
            }
        } catch (error: any) {
            if (error.response) {
                const message = typeof error.response.data === 'string' ? error.response.data : 'Server error';
                Alert.alert("Error", message);
            } else {
                Alert.alert("Error", error.message || "An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    }

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: async  (codes: Code[]) => {
            console.log('Scanned codes:', codes);



            if (codes.length > 0) {
                const scannedCode = codes[0].value;
                // Alert.alert(`${scannedCode}`);
                console.log('Scanned code full object:', scannedCode);
              await checkIn(scannedCode!);
            }
        }
    });
    useEffect(() => {
        requestPermission()
    }, []);

    if (!hasPermission) return (
        <View>
            <Text>Error: No permission</Text>
        </View>
    );

    if (device == null) return (
        <View>
            <Text>Error: No device</Text>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#626df8" />
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <View style={{flex: 1}}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                codeScanner= {codeScanner}
            />
            <SuccessDialogWithAction
                visible={showDialog}
                setVisible={setShowDialog}
                title="Success!"
                message="Checked In Successfully"
                onConfirm={onConfirm}
            />
        </View>

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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingTop: StatusBar.currentHeight,
    },
});
