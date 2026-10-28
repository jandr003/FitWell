import { Platform } from 'react-native';

export const FONTS = {
  mainHeading: {
    fontFamily: Platform.OS === 'ios' ? 'Outfit-Bold' : 'outfit_bold',
    fontWeight: '700' as const,
  },
  sectionTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Outfit-SemiBold' : 'outfit_semibold',
    fontWeight: '600' as const,
  },
  description: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins-Regular' : 'poppins_regular',
    fontWeight: '400' as const,
  },
  inputField: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins-Regular' : 'poppins_regular',
    fontWeight: '400' as const,
  },
  button: {
    fontFamily: Platform.OS === 'ios' ? 'Poppins-SemiBold' : 'poppins_semibold',
    fontWeight: '600' as const,
  },
  workoutStats: {
    fontFamily: Platform.OS === 'ios' ? 'Outfit-Bold' : 'outfit_bold',
    fontWeight: '700' as const,
  },
};

export default FONTS;
