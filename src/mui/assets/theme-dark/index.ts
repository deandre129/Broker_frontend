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
import { createTheme } from '@mui/material/styles';
// import Fade from "@mui/material/Fade";

// Material Dashboard 2 PRO React TS Base Styles
import colors from '@/mui/assets/theme-dark/base/colors';
import breakpoints from '@/mui/assets/theme-dark/base/breakpoints';
import typography from '@/mui/assets/theme-dark/base/typography';
import boxShadows from '@/mui/assets/theme-dark/base/boxShadows';
import borders from '@/mui/assets/theme-dark/base/borders';
import globals from '@/mui/assets/theme-dark/base/globals';

// Material Dashboard 2 PRO React TS Helper Functions
import boxShadow from '@/mui/assets/theme-dark/functions/boxShadow';
import hexToRgb from '@/mui/assets/theme-dark/functions/hexToRgb';
import linearGradient from '@/mui/assets/theme-dark/functions/linearGradient';
import pxToRem from '@/mui/assets/theme-dark/functions/pxToRem';
import rgba from '@/mui/assets/theme-dark/functions/rgba';

// Material Dashboard 2 PRO React TS components base styles for @mui material components
import appBar from '@/mui/assets/theme-dark/components/appBar';
import autocomplete from '@/mui/assets/theme-dark/components/form/autocomplete';
import avatar from '@/mui/assets/theme-dark/components/avatar';
import breadcrumbs from '@/mui/assets/theme-dark/components/breadcrumbs';
import button from '@/mui/assets/theme-dark/components/button';
import buttonBase from '@/mui/assets/theme-dark/components/buttonBase';
import card from '@/mui/assets/theme-dark/components/card';
import cardContent from '@/mui/assets/theme-dark/components/card/cardContent';
import cardMedia from '@/mui/assets/theme-dark/components/card/cardMedia';
import checkbox from '@/mui/assets/theme-dark/components/form/checkbox';
import container from '@/mui/assets/theme-dark/components/container';
import dialog from '@/mui/assets/theme-dark/components/dialog';
import dialogActions from '@/mui/assets/theme-dark/components/dialog/dialogActions';
import dialogContent from '@/mui/assets/theme-dark/components/dialog/dialogContent';
import dialogContentText from '@/mui/assets/theme-dark/components/dialog/dialogContentText';
import dialogTitle from '@/mui/assets/theme-dark/components/dialog/dialogTitle';
import divider from '@/mui/assets/theme-dark/components/divider';
import flatpickr from '@/mui/assets/theme-dark/components/flatpickr';
import formControlLabel from '@/mui/assets/theme-dark/components/form/formControlLabel';
import formLabel from '@/mui/assets/theme-dark/components/form/formLabel';
import icon from '@/mui/assets/theme-dark/components/icon';
import iconButton from '@/mui/assets/theme-dark/components/iconButton';
import input from '@/mui/assets/theme-dark/components/form/input';
import inputLabel from '@/mui/assets/theme-dark/components/form/inputLabel';
import inputOutlined from '@/mui/assets/theme-dark/components/form/inputOutlined';
import linearProgress from '@/mui/assets/theme-dark/components/linearProgress';
import link from '@/mui/assets/theme-dark/components/link';
import list from '@/mui/assets/theme-dark/components/list';
import listItem from '@/mui/assets/theme-dark/components/list/listItem';
import listItemText from '@/mui/assets/theme-dark/components/list/listItemText';
import menu from '@/mui/assets/theme-dark/components/menu';
import menuItem from '@/mui/assets/theme-dark/components/menu/menuItem';
import popover from '@/mui/assets/theme-dark/components/popover';
import radio from '@/mui/assets/theme-dark/components/form/radio';
import select from '@/mui/assets/theme-dark/components/form/select';
import sidenav from '@/mui/assets/theme-dark/components/sidenav';
import slider from '@/mui/assets/theme-dark/components/slider';
import step from '@/mui/assets/theme-dark/components/stepper/step';
import stepConnector from '@/mui/assets/theme-dark/components/stepper/stepConnector';
import stepIcon from '@/mui/assets/theme-dark/components/stepper/stepIcon';
import stepLabel from '@/mui/assets/theme-dark/components/stepper/stepLabel';
import stepper from '@/mui/assets/theme-dark/components/stepper';
import svgIcon from '@/mui/assets/theme-dark/components/svgIcon';
import switchButton from '@/mui/assets/theme-dark/components/form/switchButton';
import tab from '@/mui/assets/theme-dark/components/tabs/tab';
import tableCell from '@/mui/assets/theme-dark/components/table/tableCell';
import tableContainer from '@/mui/assets/theme-dark/components/table/tableContainer';
import tableHead from '@/mui/assets/theme-dark/components/table/tableHead';
import tabs from '@/mui/assets/theme-dark/components/tabs';
import textField from '@/mui/assets/theme-dark/components/form/textField';
import tooltip from '@/mui/assets/theme-dark/components/tooltip';

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors, mode: 'dark' },
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
