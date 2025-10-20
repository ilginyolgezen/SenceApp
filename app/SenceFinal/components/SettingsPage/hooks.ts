import { useState, useMemo } from 'react';
import { Alert, Linking } from 'react-native';
import { SettingsState } from './types';
import { useTheme } from '../../contexts/ThemeContext';

export function useSettings(props: {
  onPrivacySettings?: () => void;
  onSecurity?: () => void;
  onHelpCenter?: () => void;
  onFeedback?: () => void;
  onAbout?: () => void;
}) {
  const { theme, isDarkMode, toggleTheme, themeMode } = useTheme();
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    pushNotifications: true,
    emailNotifications: false,
    language: 'tr',
    currency: 'puan'
  });

  const toggleSetting = (key: string) => {
    // Check if user is turning off notifications
    if ((key === 'notifications' || key === 'pushNotifications') && 
        settings[key as keyof SettingsState]) {
      Alert.alert(
        '😔 Emin misin?',
        'Uygulama ile ilgili önemli içerikleri kaçırabilirsin.',
        [
          {
            text: 'Vazgeç',
            style: 'cancel'
          },
          {
            text: 'Kapat',
            style: 'destructive',
            onPress: () => {
              setSettings(prev => ({
                ...prev,
                [key]: !prev[key as keyof SettingsState]
              }));
            }
          }
        ]
      );
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: !prev[key as keyof SettingsState]
      }));
    }
  };

  const handleNavigate = (key: string) => {
    switch(key) {
      case 'privacy':
        props.onPrivacySettings?.();
        break;
      case 'security':
        props.onSecurity?.();
        break;
      case 'help':
        props.onHelpCenter?.();
        break;
      case 'feedback':
        props.onFeedback?.();
        break;
      case 'about':
        props.onAbout?.();
        break;
    }
  };

  const handleSocialLink = (url: string) => {
    Linking.openURL(url);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      '⚠️ Hesabı Sil',
      'Hesabınızı silmek üzeresiniz. Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinecektir.\n\nEmin misiniz?',
      [
        {
          text: 'Vazgeç',
          style: 'cancel'
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              '✅ Hesap Silindi',
              'Hesabınız başarıyla silindi. Sence\'i kullandığınız için teşekkürler.',
              [{ text: 'Tamam' }]
            );
          }
        }
      ]
    );
  };

  return {
    // Theme
    theme,
    isDarkMode,
    toggleTheme,
    themeMode,
    
    // Settings state
    settings,
    toggleSetting,
    
    // Navigation
    handleNavigate,
    handleSocialLink,
    handleDeleteAccount,
  };
}

