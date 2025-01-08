import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface CartScreenProps {}
const CartScreen = (props: CartScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>Cart Screen</Text>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})