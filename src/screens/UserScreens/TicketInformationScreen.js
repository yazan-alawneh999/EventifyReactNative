import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import { View,
        Text,
        StyleSheet,
        Image,
        TouchableOpacity,
        ScrollView,
        KeyboardAvoidingView,
        SafeAreaView,
        Platform,
    } from 'react-native';
import BottomNavBar from '../../components/BottomNavbarForUser.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';
import { BASE_URL,api } from '../Api';



const TicketInformationScreen = ({route,navigation}) => {
    const [TicketInfo,SetTicketInfo] = useState({});
    const [PreviewQR,SetPreviewQR]=useState(false);
    const {ticketid}  = route.params;
    const [qrValue,SetQrValue]=useState('a');
    

const getTicketInfo = async(ticketID)=>{
        try {
            const response = await api.get(`${BASE_URL}/api/BuyTicket/GetAllTicketsByTicketId/${ticketID}`);
            SetTicketInfo(response.data);
            SetQrValue(response.data.qrCode);


            if(response.status === 201 || response.status === 200){

              SetPreviewQR(true);
            }
          } catch (error) {
              alert('failed To bring Ticket.');
          }
    };

    useEffect(() => {
        getTicketInfo(ticketid);
    },[ticketid]);

return (
    <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={80}
        >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Ticket</Text>
            </View>


            <Image style={styles.avatar} source={ require('../../assets/Images/SmallLogo.png')}/>



            <View style={styles.aboutSection}>
                        <Text style={styles.sectionTitle}>About Me</Text>

                        <View style={styles.userInfo}>
                            <Ionicons name="code" size={23} color="#546cfc"/>
                            <Text style={styles.aboutText}>Ticekt ID: {TicketInfo.ticketid}</Text>
                        </View>
                        <View style={styles.userInfo}>
                            <Ionicons name="star" size={23} color="red"/>
                            <Text style={styles.aboutText}>Event Name: {TicketInfo.eventname}</Text>
                        </View>
                        <View style={styles.userInfo}>
                            <Ionicons name="calendar" size={23} color="#00c703"/>
                            <Text style={styles.aboutText}>Purchase Date : {TicketInfo.purchasedAt}</Text>
                        </View>
                    </View>

            {PreviewQR ? ( <View style={styles.qrContainer}>
                {qrValue||'a' ? (
                    <>
                        {(() => {
                            try {
                                return <QRCode value={String(qrValue) || 'a'} size={180} />;
                            } catch (error) {
                                console.error("QR Code render error:", error);
                                return <Text>Failed to generate QR</Text>;
                            }
                        })()}
                        <Text style={styles.qrCode}>{qrValue}</Text>
                    </>
                ) : (
                  <Text>QR Code not available</Text>
                )}
            </View>) : <Text>QR Code not available</Text>
}

        </ScrollView>
        <BottomNavBar navigation={navigation}/>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
      },
      flex: {
        flex: 1,
      },
      container: {
        padding: 16,
        height:'100%',
      },

      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
      },

      headerText: {
        fontSize: 18,
        marginLeft:'36%',
      },

  avatar: {
    width: '55%',
    height: '25%',
    borderRadius: 999,
    alignSelf: 'center',
    marginVertical:'5%',
    elevation:2
  },
  name: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '600',
    marginBottom: 10,
  },
  aboutSection: {
    marginTop: '3%',
    height:'25%',
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 8,
  },
  aboutText: {
    color: '#4A5568',
    fontSize: 15,
    marginVertical:'1%',
    marginInline:'2%',
  },
  editButton: {
    flexDirection: 'row',
    alignSelf:'center',
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 1,
    borderColor: '#546cfc',
    borderRadius: 12,
    width:'60%',
    height:'7%',
  },
  editText: {
    color: '#546cfc',
    fontWeight: '500',
  },

  userInfo: {
    display:'flex',
    alignSelf:'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    height:'20%',
  },

  buttonContainer:{
    flexDirection: 'row',
    backgroundColor:'#546cfc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'100%',
  },
  EditProfileButton: {
    width:'60%',
    height:'7%',
    alignSelf:'center',
    marginBottom:'2%',
},
EditProfileButtonText: {
    width:'50%',
    color: '#fff',
    fontSize: 15,
    textAlign:'center',
    marginStart:'15%',
    fontWeight: '500',
},
ArrowIconContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'16%',
    height:'62%',
    backgroundColor:'#495eed',
    borderRadius:'50%',
    },

    NotFountcontainer: {
        padding: 16,
        paddingTop:'30%',
        height:'100%',
        alignItems:'center',
      },
    notFountText:{
        color:'#546cfc',
        fontSize:15,
        fontWeight:'bold',
        marginTop:'5%',
    },
    NotFoundButtonText: {
        width:'50%',
        color: '#fff',
        fontSize: 14,
        textAlign:'center',
        fontWeight: '500',
        marginRight:'2%',
    },
    NotFoundbuttonContainer:{
        flexDirection: 'row',
        backgroundColor:'#ed1c00',
        borderRadius: 12,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        width:'80%',
        height:'10%',
        marginTop:'50%',
      },

      logoutButton: {
        flexDirection: 'row',
        alignSelf:'center',
        alignItems: 'center',
        justifyContent:'center',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 12,
        width:'40%',
        height:'7%',
      },
      LogoutText: {
        color: '#ed1c00',
        fontWeight: '500',
      },


      qrContainer: { alignItems: 'center' },
      qrCode: { marginTop: 10, fontWeight: 'bold' },
});

export default TicketInformationScreen;
