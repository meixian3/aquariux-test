import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateContactList } from '../actions/AppAction';
import { DEFAULT_COLOUR, GREY_COLOUR } from '../config/color';
import data from '../config/data.json';
import Header from './Header';

const ContactList = (props) => {
    const dataList = props.contactList
    const [isLoading, setIsLoading] = useState(false)

    const navigateTo = () => {
        props.navigation.navigate('EditContact')
    }

    const _onRefresh = () => {
        setIsLoading(true)
        setTimeout(() => {
            props.updateContactList(data)
            setIsLoading(false)
        }, 500);
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                icon1={'search1'}
                icon2={'plus'} title={"Contact"}
                onAction2={navigateTo}
                onAction1={() => console.log('search')}
            />
            <FlatList
                contentContainerStyle={{ paddingBottom: 20 }}
                data={dataList}
                onRefresh={_onRefresh}
                refreshing={isLoading}
                renderItem={({ item, index }) => {
                    return (
                        <ListDetails item={item} props={props} />
                    )
                }}
            />
        </View>
    )
}

const ListDetails = ({ item, props }) => {
    const fullName = item.firstName + ' ' + item.lastName
    const selectedContact = () => {
        props.navigation.navigate('EditContact', item)
    }

    return (
        <TouchableOpacity key={fullName} style={styles.listContainer} onPress={selectedContact}>
            <View style={styles.round} />
            <Text style={{ paddingLeft: 5 }}>{fullName}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderColor: GREY_COLOUR,
        borderBottomWidth: 2,
        paddingBottom: 5,
        alignItems: 'center',
        marginTop: 10
    },
    round: {
        height: 50,
        width: 50,
        backgroundColor: DEFAULT_COLOUR,
        borderRadius: 50
    }
});

function mapStateToProps(state) {
    return {
        contactList: state.app.contactList,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateContactList: updateContactList,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactList)