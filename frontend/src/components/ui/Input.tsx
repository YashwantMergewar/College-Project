import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const Input = ({ label, error, className = '', icon, secureTextEntry, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // If secureTextEntry is passed, we treat this as a password field and enable the toggle
  const isPassword = secureTextEntry !== undefined;

  return (
    <View className={`mb-4 w-full ${className}`}>
      {label && <Text className="text-sm font-semibold text-gray-700 mb-1.5 ml-1">{label}</Text>}
      
      <View 
        className={`flex-row items-center border rounded-xl px-4 py-3 transition-colors
          ${isFocused ? 'border-[#43008bff] bg-purple-50/30' : 'border-gray-300 bg-gray-50/50'} 
          ${error ? 'border-red-500 bg-red-50' : ''}`}
      >
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={isFocused ? '#43008bff' : '#9ca3af'} 
            style={{ marginRight: 8 }}
          />
        )}
        
        <TextInput
          className="flex-1 text-base text-gray-800 p-0"
          placeholderTextColor="#9ca3af"
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />

        {isPassword && (
          <TouchableOpacity 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
            className="p-1"
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color="#9ca3af"
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text className="text-xs text-red-500 mt-1.5 ml-1">{error}</Text>}
    </View>
  );
};

export default Input;
