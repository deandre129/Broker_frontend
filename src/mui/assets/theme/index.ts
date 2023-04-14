/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme } from '@mui/material';

// Material Dashboard 2 PRO React TS Base Styles
import colors from '@/mui/assets/theme/base/colors';
import breakpoints from '@/mui/assets/theme/base/breakpoints';
import typography from '@/mui/assets/theme/base/typography';
import boxShadows from '@/mui/assets/theme/base/boxShadows';
import borders from '@/mui/assets/theme/base/borders';
import globals from '@/mui/assets/theme/base/globals';

// Material Dashboard 2 PRO React TS Helper Functions
import boxShadow from '@/mui/assets/theme/functions/boxShadow';
import hexToRgb from '@/mui/assets/theme/functions/hexToRgb';
import linearGradient from '@/mui/assets/theme/functions/linearGradient';
import pxToRem from '@/mui/assets/theme/functions/pxToRem';
import rgba from '@/mui/assets/theme/functions/rgba';

// Material Dashboard 2 PRO React TS components base styles for @mui material components
import appBar from '@/mui/assets/theme/components/appBar';
import autocomplete from '@/mui/assets/theme/components/form/autocomplete';
import avatar from '@/mui/assets/theme/components/avatar';
import breadcrumbs from '@/mui/assets/theme/components/breadcrumbs';
import button from '@/mui/assets/theme/components/button';
import buttonBase from '@/mui/assets/theme/components/buttonBase';
import card from '@/mui/assets/theme/components/card';
import cardContent from '@/mui/assets/theme/components/card/cardContent';
import cardMedia from '@/mui/assets/theme/components/card/cardMedia';
import checkbox from '@/mui/assets/theme/components/form/checkbox';
import container from '@/mui/assets/theme/components/container';
import dialog from '@/mui/assets/theme/components/dialog';
import dialogActions from '@/mui/assets/theme/components/dialog/dialogActions';
import dialogContent from '@/mui/assets/theme/components/dialog/dialogContent';
import dialogContentText from '@/mui/assets/theme/components/dialog/dialogContentText';
import dialogTitle from '@/mui/assets/theme/components/dialog/dialogTitle';
import divider from '@/mui/assets/theme/components/divider';
import flatpickr from '@/mui/assets/theme/components/flatpickr';
import formControlLabel from '@/mui/assets/theme/components/form/formControlLabel';
import formLabel from '@/mui/assets/theme/components/form/formLabel';
import icon from '@/mui/assets/theme/components/icon';
import iconButton from '@/mui/assets/theme/components/iconButton';
import input from '@/mui/assets/theme/components/form/input';
import inputLabel from '@/mui/assets/theme/components/form/inputLabel';
import inputOutlined from '@/mui/assets/theme/components/form/inputOutlined';
import linearProgress from '@/mui/assets/theme/components/linearProgress';
import link from '@/mui/assets/theme/components/link';
import list from '@/mui/assets/theme/components/list';
import listItem from '@/mui/assets/theme/components/list/listItem';
import listItemText from '@/mui/assets/theme/components/list/listItemText';
import menu from '@/mui/assets/theme/components/menu';
import menuItem from '@/mui/assets/theme/components/menu/menuItem';
import popover from '@/mui/assets/theme/components/popover';
import radio from '@/mui/assets/theme/components/form/radio';
import select from '@/mui/assets/theme/components/form/select';
import sidenav from '@/mui/assets/theme/components/sidenav';
import slider from '@/mui/assets/theme/components/slider';
import step from '@/mui/assets/theme/components/stepper/step';
import stepConnector from '@/mui/assets/theme/components/stepper/stepConnector';
import stepIcon from '@/mui/assets/theme/components/stepper/stepIcon';
import stepLabel from '@/mui/assets/theme/components/stepper/stepLabel';
import stepper from '@/mui/assets/theme/components/stepper';
import svgIcon from '@/mui/assets/theme/components/svgIcon';
import switchButton from '@/mui/assets/theme/components/form/switchButton';
import tab from '@/mui/assets/theme/components/tabs/tab';
import tableCell from '@/mui/assets/theme/components/table/tableCell';
import tableContainer from '@/mui/assets/theme/components/table/tableContainer';
import tableHead from '@/mui/assets/theme/components/table/tableHead';
import tabs from '@/mui/assets/theme/components/tabs';
import textField from '@/mui/assets/theme/components/form/textField';
import tooltip from '@/mui/assets/theme/components/tooltip';

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...flatpickr,
        ...container,
      },
    },
    MuiAppBar: { ...appBar },
    MuiAutocomplete: { ...autocomplete },
    MuiAvatar: { ...avatar },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiButton: { ...button },
    MuiButtonBase: { ...buttonBase },
    MuiCard: { ...card },
    MuiCardContent: { ...cardContent },
    MuiCardMedia: { ...cardMedia },
    MuiCheckbox: { ...checkbox },
    MuiDialog: { ...dialog },
    MuiDialogActions: { ...dialogActions },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogTitle: { ...dialogTitle },
    MuiDivider: { ...divider },
    MuiDrawer: { ...sidenav },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiIcon: { ...icon },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiLinearProgress: { ...linearProgress },
    MuiLink: { ...link },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiOutlinedInput: { ...inputOutlined },
    MuiPopover: { ...popover },
    MuiRadio: { ...radio },
    MuiSelect: { ...select },
    MuiSlider: { ...slider },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepIcon: { ...stepIcon },
    MuiStepLabel: { ...stepLabel },
    MuiStepper: { ...stepper },
    MuiSvgIcon: { ...svgIcon },
    MuiSwitch: { ...switchButton },
    MuiTab: { ...tab },
    MuiTableCell: { ...tableCell },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTabs: { ...tabs },
    MuiTextField: { ...textField },
    MuiTooltip: { ...tooltip },
  },
});
