import { View, Text, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/AuthContext'
import { Ionicons } from '@expo/vector-icons'

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    setIsLoading(true)
    const res = await logout()
    if (res?.data?.success && res?.statusCode === 200) {
      ToastAndroid.showWithGravity("Logout successful", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      router.replace("/(auth)/login")
    } else {
      ToastAndroid.showWithGravity("Logout failed", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
    setIsLoading(false)
  }

  // Generate initials for avatar
  const initials = user?.fullname
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? '?'

  return (
    <View className="flex-1 bg-slate-100">
      <View
        className="bg-indigo-950 px-6 pt-9 pb-14 rounded-b-[36px] items-center"
        style={{ elevation: 8, shadowColor: "#1e1b4b", shadowOpacity: 0.3, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } }}
      >
        <View className="self-start bg-white/10 rounded-full px-3 py-1 mb-5">
          <Text className="text-indigo-200 text-xs font-semibold tracking-widest uppercase">
            My Profile
          </Text>
        </View>

        
        <View className="w-24 h-24 rounded-full bg-indigo-600 justify-center items-center border-4 border-indigo-400/40">
          <Text className="text-white text-3xl font-extrabold">{initials}</Text>
        </View>

        <Text className="text-white text-2xl font-extrabold mt-4">{user?.fullname}</Text>
        <Text className="text-indigo-300 text-sm mt-1">{user?.email}</Text>

      
        <View className="bg-indigo-600 rounded-lg px-4 py-1 mt-3">
          <Text className="text-indigo-100 text-xs font-bold tracking-wide">{user?.role}</Text>
        </View>
      </View>

      
      <View className="px-5 -mt-6">
        <View
          className="bg-white rounded-3xl px-5 py-4"
          style={{ elevation: 6, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}
        >
          
          <View className="flex-row items-center py-3 border-b border-slate-100">
            <View className="w-9 h-9 rounded-xl bg-indigo-100 justify-center items-center mr-3">
              <Ionicons name="at" size={18} color="#4f46e5" />
            </View>
            <View>
              <Text className="text-slate-400 text-xs font-medium">Username</Text>
              <Text className="text-slate-800 text-sm font-semibold mt-0.5">{user?.username}</Text>
            </View>
          </View>

         
          <View className="flex-row items-center py-3 border-b border-slate-100">
            <View className="w-9 h-9 rounded-xl bg-cyan-100 justify-center items-center mr-3">
              <Ionicons name="mail" size={18} color="#0891b2" />
            </View>
            <View>
              <Text className="text-slate-400 text-xs font-medium">Email</Text>
              <Text className="text-slate-800 text-sm font-semibold mt-0.5">{user?.email}</Text>
            </View>
          </View>

          
          <View className="flex-row items-center py-3">
            <View className="w-9 h-9 rounded-xl bg-emerald-100 justify-center items-center mr-3">
              <Ionicons name="shield-checkmark" size={18} color="#059669" />
            </View>
            <View>
              <Text className="text-slate-400 text-xs font-medium">Role</Text>
              <Text className="text-slate-800 text-sm font-semibold mt-0.5">{user?.role}</Text>
            </View>
          </View>
        </View>
      </View>

      
      <View className="px-5 mt-5 pb-28">
        <Button
          variant='danger'
          isLoading={isLoading}
          title="Logout"
          onPress={handleLogout}
          className="w-full rounded-2xl"
        />
      </View>
    </View>
  )
}

export default ProfileScreen