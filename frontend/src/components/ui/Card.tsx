import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useRouter } from 'expo-router';

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

const Card = ({ children, href, className = '', onPress, ...props }: CardProps) => {
  const router = useRouter();

  const handlePress = (e: any) => {
    if (href) {
      router.push(href as any);
    }
    if (onPress) {
      onPress(e);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      className={`bg-white rounded-2xl shadow-lg shadow-black/5 p-4 border border-gray-100 ${className}`}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Card;