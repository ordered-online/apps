import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';

export default function getIconType(type) {
  switch (type) {
    case 'zocial':
      return Zocial;
    case 'octicon':
      return Octicons;
    case 'material':
      return MaterialIcons;
    case 'material-community':
      return MaterialCommunityIcons;
    case 'ionicon':
      return Ionicons;
    case 'foundation':
      return Foundation;
    case 'evilicon':
      return EvilIcons;
    case 'entypo':
      return Entypo;
    case 'font-awesome':
      return FontAwesome;
    case 'font-awesome-5':
      return FontAwesome5;
    case 'simple-line-icon':
      return SimpleLineIcons;
    case 'feather':
      return Feather;
    case 'antdesign':
      return AntDesign;
    default:
      return Ionicons;
  }
}
