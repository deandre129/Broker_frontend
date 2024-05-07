import React from 'react';
import Link from 'next/link';
import i18n from '@/i18n';
import MDButton from '@/mui/components/MDButton';
import { Card } from '@mui/material';
import { BrandLogo } from '@/assets/resources';
import MDBox from '@/mui/components/MDBox';
import BasicLayout from '@/mui/shared/Layouts/BasicLayout';
import MDTypography from '@/mui/components/MDTypography';
import { useSelector } from 'react-redux';

const Error403Page = () => {

  return (
    <>
      <BasicLayout
        image={'/images/403.svg'}
      >
        <Card>
          <MDBox
            variant="gradient"
            bgColor={'info'}
            borderRadius="lg"
            coloredShadow={'info'}
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDBox
              display="flex"
              justifyContent="center"
              py={2}
            >
              <BrandLogo width="80%" />
            </MDBox>
          </MDBox>
          <MDBox pt={4} pb={4} px={3}>
            <MDTypography variant="h3" textAlign="center">
              403
            </MDTypography>
            <MDTypography
              variant="h6"
              textAlign="center"
              my={3}
            >
              {i18n.errors[403]}
            </MDTypography>
            <MDButton
              component={Link}
              href="/"
              variant="gradient"
              color={'info'}
              type="button"
              fullWidth
            >
              {i18n.errors.backToHome}
            </MDButton>
          </MDBox>
        </Card>
      </BasicLayout>
    </>
  );
};

export default Error403Page;
