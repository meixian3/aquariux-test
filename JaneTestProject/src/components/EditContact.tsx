import { Formik } from "formik";
import React, { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from 'yup';
import { updateContactList } from "../actions/AppAction";
import { DEFAULT_COLOUR, GREY_COLOUR } from "../config/color";
import data from '../config/data.json';
import Header from "./Header";

const EditContact = (props) => {
    const selectedContact = props.route.params
    const refLastName = useRef(null);
    const refEmail = useRef(null);
    const refPhone = useRef(null);

    const focusOnLastName = () => {
        if (refLastName && refLastName.current) {
            refLastName.current.focus();
        }
    };
    const focusOnEmail = () => {
        if (refEmail && refEmail.current) {
            refEmail.current.focus();
        }
    };
    const focusOnPhone = () => {
        if (refPhone && refPhone.current) {
            refPhone.current.focus();
        }
    };

    const INITIAL_VALUES = {
        firstName: selectedContact ? selectedContact.firstName : '',
        lastName: selectedContact ? selectedContact.lastName : '',
        email: selectedContact ? selectedContact.email : '',
        phone: selectedContact ? selectedContact.phone : ''
    }
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email("Please enter valid email")
    })

    const _onDismiss = () => {
        props.navigation.goBack()
    }
    const _handleSubmit = ({ firstName, lastName, email, phone }, formikBag) => {
        var cloned = JSON.parse(JSON.stringify(data));
        cloned.map((i) => {
            if (selectedContact && i.id === selectedContact.id) {
                i.firstName = firstName
                i.lastName = lastName
                i.email = email
                i.phone = phone
            }
            return i
        })
        props.updateContactList([...cloned])
        _onDismiss()
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Formik
                initialValues={INITIAL_VALUES}
                onSubmit={_handleSubmit}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    errors,
                    touched,
                }) => {
                    return (
                        <View>
                            <Header label1={'Cancel'} label2={'Save'} onAction1={_onDismiss} onAction2={handleSubmit} />
                            <View style={styles.round}></View>
                            <LabelTitle title={'Main Information'} />
                            <View style={styles.container}>
                                <Text style={styles.label}>First Name</Text>
                                <View style={{ width: '70%' }}>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize="none"
                                        value={values.firstName}
                                        onChangeText={handleChange('firstName')}
                                        onBlur={handleBlur('firstName')}
                                        returnKeyType='next'
                                        onSubmitEditing={focusOnLastName}
                                    />
                                    {(errors.firstName && touched.firstName) &&
                                        <Text style={styles.errorText}>{errors.firstName}</Text>
                                    }
                                </View>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.label}>Last Name</Text>
                                <View style={{ width: '70%' }}>
                                    <TextInput
                                        ref={refLastName}
                                        style={styles.input}
                                        autoCapitalize="none"
                                        value={values.lastName}
                                        onChangeText={handleChange('lastName')}
                                        onBlur={handleBlur('lastName')}
                                        returnKeyType='next'
                                        onSubmitEditing={focusOnEmail}
                                    />
                                    {(errors.lastName && touched.lastName) &&
                                        <Text style={styles.errorText}>{errors.lastName}</Text>
                                    }
                                </View>
                            </View>
                            <LabelTitle title={'Sub Information'} />
                            <View style={styles.container}>
                                <Text style={styles.label}>Email</Text>
                                <View style={{ width: '70%' }}>
                                    <TextInput
                                        ref={refEmail}
                                        style={styles.input}
                                        autoCapitalize="none"
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        returnKeyType='next'
                                        onSubmitEditing={focusOnPhone}
                                    />
                                    {(errors.email && touched.email) &&
                                        <Text style={styles.errorText}>{errors.email}</Text>
                                    }
                                </View>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.label}>Phone</Text>
                                <TextInput
                                    ref={refPhone}
                                    style={[styles.input, { width: '70%' }]}
                                    autoCapitalize="none"
                                    value={values.phone}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    returnKeyType='next'
                                />
                            </View>
                        </View>
                    )
                }}
            </Formik>
        </View>
    )
}

const LabelTitle = ({ title }) => {
    return (
        <View style={{ backgroundColor: GREY_COLOUR }}>
            <Text style={{ fontWeight: 'bold', padding: 5, paddingLeft: 15 }}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 15,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: GREY_COLOUR,
        paddingVertical: 5
    },
    round: {
        height: 100,
        width: 100,
        backgroundColor: DEFAULT_COLOUR,
        borderRadius: 50,
        alignSelf: 'center',
        marginVertical: 10
    },
    input: {
        height: 30,
        borderWidth: 1.5,
        borderColor: GREY_COLOUR,
        borderRadius: 5,
        padding: 5,
    },
    label: {
        width: '25%'
    },
    errorText: {
        fontSize: 10,
        color: 'red',
    },
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


export default connect(mapStateToProps, mapDispatchToProps)(EditContact)
