import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link, router } from 'expo-router';
import SkeletonLoader from '@/components/atoms/Skeleton/Skeleton';

interface SignInScreenProps { }
const SignInScreen: FC<SignInScreenProps> = ({ }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        router.dismissAll();
        router.push('/(tabs)');
      }}>
        <Text>SignIn Screen</Text>
      </TouchableOpacity>
      <SkeletonLoader />
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})