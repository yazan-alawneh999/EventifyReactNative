/* eslint-disable no-alert */
import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../../components/BottomNavbarForUser.tsx';
import SuccessDialog  from '../../components/SucesssPopupDialog.js';
import FailedDialog  from '../../components/FailedPopupDialog.js';
import { BASE_URL,api } from '../Api';
import {getCredential}   from '../../../utils/Storage.js';
import { WebView } from 'react-native-webview';

export default function TicketInfoScreen({ route,navigation }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState('Regular');
  const [promoCode, setPromoCode] = useState('');
  const [TicketPrice,SetTicketPrice] = useState(0);
  const [TicketPriceAccordigtoType,SetTicketPriceAccordigtoType] = useState(0);
  const [EventName,SetEventName] = useState('');
  const [discountAmount,SetdiscountAmount] = useState(0);
  const [TotalPrice,SetTotalPrice] = useState(0);
  const [PromocodeVisible, setPromocodeVisible] = useState(false);
  const [FailedPromocodeVisible, setFailedPromocodeVisible] = useState(false);
  const [BuyVisible, setBuyVisible] = useState(false);
  const [FailedBuyVisible, setFailedBuyVisible] = useState(false);
  const [userId,setUserId] = useState();

  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState('Pending');

//   const handleResponse = async (data) => {
//
//
//     //     if (data.title === 'success') {
//     //
//     //     setShowModal(false);
//     //     setStatus('Payment has done successfully');
//     //     console.log("onPaypal Success")
//     //       try{
//     //         await BuyTicket();
//     //       }catch (err){
//     //       console.log(err);
//     //       }
//     //
//     //
//     // }
//     //     else if (data.title === 'cancel') {
//     //     setShowModal(false);
//     //     setStatus('Cancelled');
//     //     console.log("onPaypal cancel")
//     // } else {
//     //     return;
//     // }
// };
  const handleResponse = async (data) => {
    if (data.title === 'success') {
      setShowModal(false);
      setStatus('Payment has done successfully');
      console.log("✅ onPaypal Success - Attempting to call BuyTicket");

      try {
        await BuyTicket();
        console.log("✅ BuyTicket was called successfully");
      } catch (err) {
        console.log("❌ Error during BuyTicket:", err);
      }

    } else if (data.title === 'cancel') {
      setShowModal(false);
      setStatus('Cancelled');
      console.log("❌ onPaypal cancel");
    }
  };

  let EventID = route?.params?.EventID ?? 6;


  const getUserIdAndData = async () => {
    const credentials = await getCredential();
    setUserId(credentials.userId);

  };

  useEffect(() => {
    getUserIdAndData();
  }, []);



useEffect(() => {
  gettingEventInfo(EventID);
  if (selectedType  === 'Premium') {
    SetTicketPriceAccordigtoType(TicketPrice * 1.20);
  } else if (selectedType  === 'VIP') {
    SetTicketPriceAccordigtoType(TicketPrice * 1.40);
  }else if (selectedType === 'Regular'){
    SetTicketPriceAccordigtoType(TicketPrice);
  }
  SetTotalPrice((TicketPriceAccordigtoType * quantity) - discountAmount);
},[quantity, TicketPriceAccordigtoType, discountAmount, EventID,selectedType,TicketPrice]);

const gettingEventInfo = async (evID) => {
  try {
    const response = await api.get(`${BASE_URL}/api/Event/getEventByID/${evID}`);
    const data = response.data;
    SetEventName(data.eventName);
    SetTicketPrice(Number(data.price));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};



const getDiscounts = async ({userID,disCode }) =>{
  try {
    const response = await api.get(`${BASE_URL}/api/Discount/GetDiscountsByUserAndCode/${userID}/${disCode}`);
    const data = response.data;
    SetdiscountAmount(Number(data.discountamount));
    if(response.status === 200 || response.status === 201){
      setPromocodeVisible(true);
    }
  } catch (error) {
    setFailedPromocodeVisible(true);
  }
};


const BuyTicket = async () => {
  let discountCode = '';
  for(let i = 1; i <= quantity; i++){
    if(i === 1){
      discountCode = promoCode;
    }
    else{
      discountCode = '';
    }

      try {
        // const token = (await getCredential()).token;
        const credentials = await getCredential();  // move inside here
        const token = credentials.token;
        const userId = credentials.userId;
        const response = await axios.post(`${BASE_URL}/api/BuyTicket`,
            {
              t_EventID:EventID,
              t_UserID: userId,
              t_TicketType: selectedType,
              t_Price:TicketPriceAccordigtoType,
              t_Discount:discountCode,
            },{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
        );
        console.log("userId in BuyTicket", userId);
        if (response.status === 200 || response.status === 201) {
          setBuyVisible(true);
        }
        } catch (error) {
            alert('failed To Buy the Ticket.');
        }
      }
};



const changeQuantity = (delta) => {
  setQuantity(prev => Math.max(1, prev + delta));
};

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">


          <Modal
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <WebView
                    source={{
                        uri: `https://9469-149-200-133-207.ngrok-free.app/paypal/?amount=${TotalPrice}`,
                    }}
                    onNavigationStateChange={handleResponse}
                    injectedJavaScript={'document.f1.submit()'}
                />
            </Modal>



          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                          <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Ticket info</Text>
            <Ionicons name="share-social-outline" size={24} color="black" />
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={ require('../../assets/Images/Secondarylogo.png')}
              style={styles.image}
            />
          </View>




          <Text style={styles.title}>{EventName}</Text>
          <Text style={styles.subtitle}>Type</Text>

          <View style={styles.TypesContainer}>

            <View style={styles.TypeOptions}>
              {['VIP', 'Regular', 'Premium'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[styles.typeButton, selectedType === type && styles.selectedType]}
                  onPress={() => {setSelectedType(type);}}
                >
                  <Text style={[styles.typeText, selectedType === type && styles.selectedTypeText]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>

          </View>

          <SuccessDialog
            visible={PromocodeVisible}
            setVisible={setPromocodeVisible}
            title="Success!"
            message="Congrats! Your Promo Code successfully Applied"
          />

          <SuccessDialog
            visible={BuyVisible}
            setVisible={setBuyVisible}
            title="Success!"
            message="Successfully Bought"
          />

          <FailedDialog
            visible={FailedPromocodeVisible}
            setVisible={setFailedPromocodeVisible}
            title="Failed!"
            message="Failed to Apply Promo Code"
          />

          <FailedDialog
            visible={FailedBuyVisible}
            setVisible={setFailedBuyVisible}
            title="Failed!"
            message="Failed to Buy Tickts"
          />


          <Text style={styles.subtitle}>Promo Code</Text>
          <View style={styles.promoContainer}>
            <TextInput
              placeholder="Code . . ."
              placeholderTextColor="#888"
              style={styles.promoInput}
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity style={styles.applyButton}
              onPress={() => getDiscounts({ userID: userId, disCode: promoCode })}
            >
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>


          <Text style={styles.subtitle}>Price</Text>
          <View style={styles.priceContainer}>

            <TouchableOpacity onPress={() =>changeQuantity(-1)}
            style={styles.QuantityBtn}>
              <Text style={styles.QuantityText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.QuantityCount}>{quantity}</Text>

            <TouchableOpacity onPress={() =>changeQuantity(1)}
              style={styles.QuantityBtn}>
              <Text style={styles.QuantityText}>+</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyText}>{TotalPrice < 0 ? '$0' : `$${TotalPrice.toLocaleString()}`}</Text>
            </TouchableOpacity>
          </View>



          <View style={styles.BuyButtonContainer}>
          <TouchableOpacity style={styles.cartButton}
          onPress={ ()=> { setShowModal(true);}}
          >
            <Ionicons name="cart-outline" size={20} color="white" />
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
          </View>



        </ScrollView>
        <BottomNavBar navigation={navigation}/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
  },





  imageContainer: {
    position: 'relative',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'30%',
    elevation:5,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBlock:'2%',
  },
  image: {
    width: '85%',
    height: '85%',
    borderRadius: 12,
    backgroundColor:'black',
  },



  title: {
    fontSize: 25,
    color:'#666',
    fontWeight: 'bold',
    marginBlock: '2%',
  },


  subtitle: {
    fontSize: 16,
    color: '#666',
  },



  TypesContainer:{
    height:'6%',
    padding:'0%',
    marginInline:'0%',
    marginVertical: '3%',
    marginBottom:'6%',
  },

  TypeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:'100%',
  },
  typeButton: {
    flex: 1,
    marginHorizontal: '1%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent:'center',
  },
  selectedType: {
    backgroundColor: '#546cfc',
    borderColor: '#546cfc',
  },
  typeText: {
    color: '#666',
  },
  selectedTypeText: {
    color: '#fff',
    fontWeight: 'bold',
  },





  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height:'6%',
    padding:'0%',
    marginBottom:'6%',
    marginTop:'3%',
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: '3%',
    marginRight: '4%',
    height:'100%',
    color:'#546cfc',
    fontWeight:'bold',
  },





  applyButton: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#546cfc',
    width:'25%',
    height:'100%',
    borderRadius: 12,
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
  },






  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBlock: '5%',
    height:'6%',
  },



  QuantityBtn: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#546cfc',
    height:'80%',
    width:'10.5%',
    borderRadius: '50%',
  },
  QuantityText: {
    fontSize: 18,
    color:'#fff',
    fontWeight: 'bold',
  },
  QuantityCount: {
    fontSize: 17,
    color:'#666',
  },




  BuyButtonContainer:{
    height:'7%',
    marginTop:'6%',
  },
  cartButton: {
    flexDirection: 'row',
    backgroundColor: '#546cfc',
    borderRadius: 12,
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartText: {
    color: '#fff',
    marginLeft: '1%',
    fontWeight: 'bold',
    fontSize: 16,
  },


});
