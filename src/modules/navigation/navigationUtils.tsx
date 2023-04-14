import i18n from '@/i18n';
import navigationEnumerators from '@/modules/navigation/navigationEnumerators';

export const navigationTypeOptions =
  navigationEnumerators.type.map((value) => ({
    value,
    label: i18n.entities.navigation.enumerators.type[value],
  }));
