import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';
import { DEFAULT_COLOUR, GREY_COLOUR, SECONDARY_COLOUR } from '../config/color';

interface HeaderProps {
    icon1?: string,
    icon2?: string,
    title?: string,
    label1?: string,
    label2?: string,
    onAction1?: () => void,
    onAction2?: () => void
}

const TOP_HEIGHT = Platform.OS === 'ios' ? 80 : StatusBar.currentHeight + 20

const Header = ({ icon1, icon2, label1, label2, title, onAction1, onAction2 }: HeaderProps) => {
    return (
        <SafeAreaView style={styles.headerContainer}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => onAction1()}>
                    {icon1 ? <Icon name={'search1'} color={DEFAULT_COLOUR} size={20} />
                        : <Text style={styles.label}>{label1}</Text>}
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
                <TouchableOpacity onPress={() => onAction2()}>
                    {icon2 ? <Icon name={'plus'} color={DEFAULT_COLOUR} size={20} />
                        : <Text style={styles.label}>{label2}</Text>}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    headerContainer: {
        height: TOP_HEIGHT,
        backgroundColor: SECONDARY_COLOUR,
        borderBottomWidth: 2,
        borderColor: GREY_COLOUR,
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center'
    },
    label: {
        color: DEFAULT_COLOUR
    }
});

export default Header