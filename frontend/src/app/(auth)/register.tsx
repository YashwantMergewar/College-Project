import { View, Text, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { registerUser } from '@/services/auth.service'
import { useRouter } from 'expo-router'

const RegisterScreen = () => {
  const [data, setData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const router = useRouter()

  const handleRegister = async() => {
    if(!data.fullname || !data.username || !data.email || !data.password || !data.confirmPassword){
      ToastAndroid.showWithGravity("Please fill all the fields", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      return;
    }
    if(data.password !== data.confirmPassword){
      ToastAndroid.showWithGravity("Password do not match", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      return;
    }

    const res = await registerUser(data)
    if(res.statusCode === 201){
      ToastAndroid.showWithGravity("Registration successful", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      router.replace("/login")
    }else{
      ToastAndroid.showWithGravity("Registration failed", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
  }

  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-3xl font-bold mb-8'>Register</Text>
      <View className='w-full px-4 mb-4'>
        
        <Input 
          label='Fullname'
          placeholder='Enter your fullname' 
          value={data.fullname}
          onChangeText={(e) => setData({...data, fullname: e})}
          returnKeyType="next"
        />

        <Input 
          label='Username'
          placeholder='Enter your username' 
          value={data.username}
          onChangeText={(e) => setData({...data, username: e})}
          returnKeyType="next"
        />

        <Input 
          label='Email'
          placeholder='Enter your email' 
          value={data.email}
          onChangeText={(e) => setData({...data, email: e})}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
        />
        
        <Input 
          label='Password'
          placeholder='Enter your password' 
          value={data.password}
          onChangeText={(e) => setData({...data, password: e})}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleRegister}
        />

        <Input 
          label='Confirm Password'
          placeholder='Enter your password again' 
          value={data.confirmPassword}
          onChangeText={(e) => setData({...data, confirmPassword: e})}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleRegister}
        />

        <Button 
          title="Register" 
          onPress={handleRegister} 
          className="mt-4" 
        />
      </View>

      <View className='w-full px-4'>
        <Text className='text-center text-gray-500'>Already have an account? </Text>
        <Button
          title="Login"
          onPress={() => router.push("/login")}
          className="mt-4"
          variant='outline'
        />
      </View>
    </View>
  )
}

export default RegisterScreen