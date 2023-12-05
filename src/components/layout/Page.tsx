import CombinedStats from '../CombinedStats';
import Footer from './Footer';
import './page.sass';

const Page = () => {
  return (
    <div className="page">
        <CombinedStats />
        <Footer />
    </div>
  )
}

export default Page