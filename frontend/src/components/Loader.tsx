import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loader = () => {
  return (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator size="large" color="#43008bff" />
    </View>
  )
}

export default Loader