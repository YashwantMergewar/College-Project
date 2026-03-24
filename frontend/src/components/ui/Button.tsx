import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  isLoading?: boolean;
  className?: string;
  textClassName?: string;
}

const Button = ({ 
  title, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  textClassName = '',
  disabled,
  ...props 
}: ButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-200';
      case 'outline':
        return 'bg-transparent border-2 border-[#43008bff]';
      case 'danger':
        return 'bg-red-500';
      case 'primary':
      default:
        return 'bg-[#43008bff]';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'text-gray-800';
      case 'outline':
        return 'text-[#43008bff]';
      case 'danger':
        return 'text-white';
      case 'primary':
      default:
        return 'text-white';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      className={`w-full p-4 rounded-xl flex-row justify-center items-center ${getVariantStyles()} ${disabled ? 'opacity-50' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? '#43008bff' : 'white'} />
      ) : (
        <Text className={`text-lg font-bold text-center ${getTextStyles()} ${textClassName}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
