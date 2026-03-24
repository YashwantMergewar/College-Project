import { View, Text, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { loginUser } from '@/services/auth.service'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/AuthContext'

const LoginScreen = () => {
  const router = useRouter()
  const { loadUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    username: "",
    password: ""
  })

  const handleLogin = async () => {
    if(!data.username || !data.password){
      ToastAndroid.showWithGravity("Please fill all the fields", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      return;
    }
    setLoading(true)
    const res = await loginUser(data)
    if(res?.statusCode === 200){
      await loadUser() 
      ToastAndroid.showWithGravity("Login successful", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      router.replace("/(tabs)")
    }else{
      ToastAndroid.showWithGravity("Login failed", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
    setLoading(false)
  }

  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-3xl font-bold mb-8'>Login</Text>
      <View className='w-full px-4 mb-4'>
        
        <Input 
          label='Username'
          placeholder='Enter your username' 
          value={data.username}
          onChangeText={(e) => setData({...data, username: e})}
          returnKeyType="next"
        />
        
        <Input 
          label='Password'
          placeholder='Enter your password' 
          value={data.password}
          onChangeText={(e) => setData({...data, password: e})}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        <Button
          title="Login" 
          onPress={handleLogin} 
          className="mt-4" 
          isLoading={loading? true : false}
        />
      </View>

      <View className='w-full px-4'>
        <Text className='text-center text-gray-500'>Don't have an account? </Text>
        <Button
          title="Register"
          onPress={() => router.push("/register")}
          className="mt-4"
          variant='outline'
        />
      </View>
    </View>
  )
}

export default LoginScreen