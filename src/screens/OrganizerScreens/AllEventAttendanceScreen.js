/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
View,
Text,
FlatList,
StyleSheet,
KeyboardAvoidingView,
SafeAreaView,
Platform,
TouchableOpacity,
Dimensions,
Image,
} from 'react-native';
import BottomNavBar from '../../components/BottomNavbarForOrganizer.tsx';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BASE_URL,api} from  '../Api.tsx';

const screenHeight = Dimensions.get('window').height;



const AllAttendanceList = ({navigationToTicket,attindanceList})=>{


    const renderItem = ({ item }) => (
        <TouchableOpacity  onPress={()=>{}}>
        <View  style={styles.card}>
          <View style={styles.row}>

            <View style={styles.distanceBadge}>
                <Image source={require('../../assets/Images/SmallLogo.png')} style={styles.ticketImage}/>
            </View>


            <View style={styles.cardContent}>

              <Text style={styles.name}>{item.firstName} {item.lastName}</Text>

              <Text style={styles.infoText}>Type: {item.ticketType}</Text>

              <Text style={styles.infoText}>User ID: {item.userID}</Text>

              <View style={styles.tagContainer}>
                    <Text style={styles.tagText}> {item.purchasedAt ? new Date(item.purchasedAt).toLocaleDateString() : ''}</Text>
              </View>


            </View>
          </View>
        </View>
        </TouchableOpacity>
      );



    return (
    <View >
    <FlatList
      data={attindanceList}
      renderItem={renderItem}
      contentContainerStyle={styles.flatListContainer}
    />
    </View>
    );
};


const EmptyListComponent = ({navigation})=>{
return(
        <View style={styles.NotFountcontainer}>
            <Ionicons name="alert-circle" size={150} color="#546cfc"/>
            <Text style={styles.notFountText}>This Event Dose not have Attendance yet</Text>
        </View>
    );
};


const AllEventAttendanceScreen = ({navigation}) => {
    const [attindanceList,setattindanceList] = useState(null);

    const EventID = 5;
        useEffect(() => {
            getAttindanceList({ evID: EventID });
        },[]);


    const getAttindanceList = async ({evID}) =>{
        try {
          const response = await api.get(`${BASE_URL}/api/Reports/GetAttendanceList/${evID}`);
          const data = response.data;
          setattindanceList(data);

        } catch (error) {
            alert('failed To bring Attindance List.');
        }
      };

return (
    <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={80}
        >
            <View style={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="black"/>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>User Tickets</Text>
                </View>

                {attindanceList?.length > 0  ?
                 <AllAttendanceList navigationToTicket={navigation}  attindanceList ={attindanceList} /> :
                 <EmptyListComponent navigationToTicket={navigation} />
                 }

            </View>
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
        marginLeft:'30%',
    },


    flatListContainer:{
        padding:'1%',
        paddingBottom: '20%' ,
        paddingTop:'5%',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: '4%',
        elevation:5,
        height: screenHeight * 0.14,
        width:'100%',
    },
    row: {
        flexDirection: 'row',
        alignItems:'center',
        height:'100%',
        width:'100%',
    },
    distanceBadge: {
        backgroundColor: '#fff',
        width: '23%',
        height: '70%',
        borderWidth:2,
        borderRadius: 999,
        borderBlockColor:'#546cfc',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:'3%',
    },
    ticketImage:{
        width: '100%',
        height: '100%',
        borderRadius: 999,
    },
    cardContent: {
        display:'flex',
        justifyContent:'center',
        height:'100%',
        width:'79%',
    },
    name: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 14,
    },
    infoText: {
        color: '#918e8e',
        fontSize: 12,
        marginBlock:'1%',
    },
    tagContainer: {
        flexDirection: 'row',
        height:'25%',
        width:'35%',
        borderRadius:12,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#546cfc',
    },
    tagText: {
        color: '#fff',
        fontSize: 13,
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
        backgroundColor:'#546cfc',
        borderRadius: 12,
        alignSelf:'center',
        alignItems: 'center',
        justifyContent: 'center',
        width:'80%',
        height:'10%',
        marginTop:'50%',
      },
      EditProfileButton: {
        width:'100%',
        height:'100%',
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
});

export default AllEventAttendanceScreen;
