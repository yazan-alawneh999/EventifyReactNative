import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

const SuccessDialog = ({ visible, setVisible, title, message }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>


          <View style={styles.iconContainer}>
            <View style={styles.checkmarkBackground}>
              <Text style={styles.checkmark}>!</Text>
            </View>
          </View>



          <Text style={styles.DialogTitle}>{title}</Text>
          <Text style={styles.message}>{message}</Text>



          <TouchableOpacity style={styles.button} onPress={() => setVisible(false)}>
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  DialogContainer: {
    flex: 1,
    width: '65%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: '65%',
    height: '35%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: '8%',
    paddingHorizontal: '10%',
    alignItems: 'center',
  },
  iconContainer: {
    width: '50%',
    height: '39%',
  },
  checkmarkBackground: {
    backgroundColor: '#e30000',
    borderRadius: 999,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 50,
    color: 'white',
  },
  DialogTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#546cfc',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
},
    buttonText: {
    color: 'white',
    fontWeight: '600',
},
});

export default SuccessDialog;
