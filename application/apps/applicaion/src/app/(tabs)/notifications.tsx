import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import { useCounter } from '@applicaion/store/useCounter';
import { useTheme } from '@applicaion/theme';

interface NotificationsProps { }
const NotificationsScreen = (props: NotificationsProps) => {
  const {
    gutters,
    components,
    backgrounds
  } = useTheme();
  const { click, incrementClick } = useCounter();

  return (
    <View style={styles.container}>
      <Text>{click}</Text>
      <Text>Notifications Screen</Text>
      <TouchableOpacity
        onPress={() => incrementClick()}
        style={[components.buttonCircle, backgrounds.gray400, gutters.marginBottom_16]}
        testID="fetch-user-button"
      >
      </TouchableOpacity>
    </View>
  )
}

export default NotificationsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})