import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { BASE_URL } from '../Api';

export class PayPal extends React.Component {
    state = {
        showModal: false,
        status: "Pending"
    };

    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "payment has done successfully" });
            // create ticket

        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };
     amount = 5.99;
    render() {
        return (
          <View style={{marginTop: 200}}>
              <Modal
                  visible={this.state.showModal}
                  onRequestClose={() => this.setState({showModal: false})}>
                  <WebView
                      source={{
                          uri: `https://f670-37-123-83-25.ngrok-free.app/pay?amount=${this.amount}`,
                      }}
                      // source={{ uri: "https://ccf6-37-123-83-25.ngrok-free.app"}}
                      onNavigationStateChange={data => this.handleResponse(data)}
                      injectedJavaScript={`document.f1.submit()`}
                  />
              </Modal>
            <TouchableOpacity
              style={{width: 300, height: 100}}
              onPress={() => this.setState({showModal: true})}>
              <Text>Pay with Paypal</Text>
            </TouchableOpacity>
            <Text>Payment Status: {this.state.status}</Text>
          </View>
        );
    }
}
