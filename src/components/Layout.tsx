// import Advisors from './sidebar/Advisors';
// import Category from './sidebar/Category';
// import ComparableBrokers from './sidebar/ComparableBrokers';
import Container from '@mui/material/Container';
// import FeaturedBrokers from './sidebar/FeaturedBrokers';
// import ForexSchool from './sidebar/ForexSchool';
// import ForexStrategy from './sidebar/ForexStrategy';
import Grid from '@mui/material/Grid';
import Meta from './Meta';
// import MostRead from './sidebar/MostRead';
import PageLayout from '@/mui/shared/Layouts/PageLayout';
// import Promotion from './sidebar/Promotion';
import PropTypes from 'prop-types';
// import TopBrokers from './sidebar/TopBrokers';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload'

const TopBrokers = dynamic(() => import('./sidebar/TopBrokers'));
const Advisors = dynamic(() => import('./sidebar/Advisors'));
const Category = dynamic(() => import('./sidebar/Category'));
const ComparableBrokers = dynamic(() => import('./sidebar/ComparableBrokers'));
const FeaturedBrokers = dynamic(() => import('./sidebar/FeaturedBrokers'));
const ForexSchool = dynamic(() => import('./sidebar/ForexSchool'));
const ForexStrategy = dynamic(() => import('./sidebar/ForexStrategy'));
const Promotion = dynamic(() => import('./sidebar/Promotion'));
const MostRead = dynamic(() => import('./sidebar/MostRead'));

function Layout({
  title,
  keywords,
  description,
  topBroker,
  category,
  mostRead, 
  featuredBrokers, 
  forexSchool, 
  forexStrategy, 
  promotion,
  navigation,
  categoryFooter,
  brokerComparable,
  author,
  record,
  children,
  noIndex = false,
  noArticle = false,
  
}) {
  console.log("Meta Title: ", title);
  return (
    <PageLayout fixedNavBar={false} navigation={navigation} categoryFooter={ categoryFooter } topBroker={topBroker}>
      <Meta
        author={author}
        title={title}
        keywords={keywords}
        description={description}
        noIndex={noIndex}
        noArticle={noArticle}
      />
      <Container>
        <Grid spacing={2} container>
          <Grid xl={9} lg={8} md={12} xs={12} item>
            {children}
          </Grid>
          <Grid xl={3} lg={4} md={12} xs={12} item>
            <Grid spacing={2} container>
              <TopBrokers topBroker = {topBroker}/>
              {Boolean(record) && (
                <ComparableBrokers record={record} brokerComparable = {brokerComparable}/>
              )}
              {Boolean(record) && (
                <Advisors record={record} />
              )}
              <Category category = { category }/>
              <FeaturedBrokers featuredBrokers = {featuredBrokers}/>
              <MostRead mostRead = {mostRead}/>
              <Promotion promotion = {promotion}/>
              <ForexSchool forexSchool = { forexSchool }/>
              <ForexStrategy forexStrategy = {forexStrategy}/>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
}


Layout.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  record: PropTypes.any,
  children: PropTypes.any,
  noIndex: PropTypes.bool,
  noArticle: PropTypes.bool,
  topBroker: PropTypes.any,
  category: PropTypes.any,
  mostRead: PropTypes.any, 
  featuredBrokers: PropTypes.any, 
  forexSchool: PropTypes.any, 
  forexStrategy: PropTypes.any, 
  promotion: PropTypes.any,
  navigation: PropTypes.any,
  categoryFooter: PropTypes.any,
  brokerComparable: PropTypes.any,
};

export default Layout;
