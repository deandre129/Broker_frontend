import { Card, CardHeader, Grid } from "@mui/material";
import ImageView from "../ImageView";
import MaterialLink from "@mui/material/Link";
import dynamic from "next/dynamic";
// import MDBox from '@/mui/components/MDBox';
// import MDTypography from '@/mui/components/MDTypography';

const MDBox = dynamic(() => import("@/mui/components/MDBox"));
const MDTypography = dynamic(() => import("@/mui/components/MDTypography"));

function Promotion({ promotion }) {
  return (
    <Grid xs={12} item>
      <Card>
        <CardHeader
          title={
            <MDTypography variant="body1" fontWeight="bold" lineHeight={1.35}>
              Sponsoren
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          <Grid spacing={2} container>
            {promotion.rows.map((row, idx) => (
              <Grid key={idx} xs={12} item>
                <MDBox>
                  <MaterialLink href={row.link} target="_blank">
                    <ImageView
                      value={row.promotion_image}
                      sx={{
                        width: "100%",
                      }}
                    />
                  </MaterialLink>
                  <MDTypography
                    variant="body2"
                    fontWeight="regular"
                    textAlign="center"
                    lineHeight={1}
                    color={"info"}
                    mx="auto"
                    mt={1}
                  >
                    <MaterialLink
                      href={row.url}
                      underline="hover"
                    >
                      {row.linktext}
                    </MaterialLink>
                  </MDTypography>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </Card>
    </Grid>
  );
}

Promotion.propTypes = {};

export default Promotion;
