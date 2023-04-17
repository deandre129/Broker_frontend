import Spinner from '@/components/shared/Spinner';
import axios from 'axios';
import config from '@/config';

function Redirect({record}) {

  window.open(record.link);

  return <Spinner />;
}

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params;
  const url = slug

  const recordRes = await axios.post(`${config.backendUrl}/affiliate-link/home`,{url});
  const record = recordRes.data;

  return { props: { slug, record } };
};


export default Redirect;
