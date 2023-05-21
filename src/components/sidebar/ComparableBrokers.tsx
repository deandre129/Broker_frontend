import { Autocomplete, Box, Card, CardHeader, Grid, TextField } from '@mui/material';
import Link from 'next/link';
import MaterialLink from '@mui/material/Link';
import i18n from '@/i18n';
// import MDBox from '@/mui/components/MDBox';
// import MDTypography from '@/mui/components/MDTypography';
import { selectMuiSettings } from '@/modules/mui/muiSelectors';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const MDBox = dynamic(() => import('@/mui/components/MDBox'));
const MDTypography = dynamic(() => import('@/mui/components/MDTypography'));
const MDButton = dynamic(() => import('@/mui/components/MDButton'));
import { useRouter } from 'next/router';

function ComparableBrokers({ record, brokerComparable, topBroker }) {
  const router = useRouter();

  let brokerList = [] as Array<any>;
  let count = 0;
  for(var i = 0; brokerComparable.rows[i] ; i++) {
    if(brokerComparable.rows[i].is_broker == true){
      brokerList[count] = { name: brokerComparable.rows[i].name, id: brokerComparable.rows[i].name_normalized };
      count++;
    }
  }

  let initialValue;

  if(record.name_normalized == topBroker.rows[0].name_normalized) {
    initialValue = {
      name: topBroker.rows[1].name,
      id: topBroker.rows[1].name_normalized 
    }
  } else {
    initialValue = {
      name: topBroker.rows[0].name,
      id: topBroker.rows[0].name_normalized 
    }
  }
  
  //const [value, setValue] = useState(initialValue);

  const onSubmit = (values) => {
    router.push(
      `/forex-cfd-broker-vergleich/${record.name_normalized}-versus-${initialValue.id}`,
    );
  };

  return (
    <Grid xs={12} item>
      <Card>
        <CardHeader
          title={
            <MDTypography
              variant="body1"
              fontWeight="bold"
              lineHeight={1.35}
            >
              {`${record.name.replace(/\([\w\d\s]+\)/g, '')
                .trim()} vergleichen mit`}
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          {/* {brokerComparable.rows
            .filter(({ id }) => id !== record.id)
            .map((row, idx) => (
              <MDTypography
                key={idx}
                variant="body2"
                fontWeight="regular"
                color={'info'}
              >
                <MaterialLink
                  component={Link}
                  href={`/forex-cfd-broker-vergleich/${record.name_normalized}-versus-${row.name_normalized}`}
                  underline="hover"
                >
                  {row.name}
                </MaterialLink>
              </MDTypography>
            ))} */}
            <Autocomplete
              disablePortal
              id="broker"
              options={brokerList}
              defaultValue={initialValue}
              getOptionLabel={(option) => option.name}
              onChange={(event: any, newValue: any) => {
                if(newValue) {
                  initialValue = newValue;
                  //setValueB({ id:newValue.id , name: newValue.name});
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps
                  }}
                  variant="standard"
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.name}
                </Box>
              )}
            />
            <MDButton
              variant="contained"
              type="submit"
              onClick={onSubmit}
              color={'info'}
              fullWidth
              sx={{ mt: 2 }}
            >
              <MDTypography
                variant="h3"
                fontSize="inherit"
                color="inherit"
              >
                {i18n.entities.broker.comparison.compare}
              </MDTypography>
            </MDButton>
        </MDBox>
      </Card>
    </Grid>
  );
}

ComparableBrokers.propTypes = {};

export default ComparableBrokers;
