import '../Styles/LangingPage.css'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="content">
        <button className="btn admin-btn" onClick={() => navigate('/admin/login')}>Admin Login</button>
        <button className="btn user-btn" onClick={() => navigate('/user/login')}>User Login</button>
      </div>
    </div>
  );
}

export default LandingPage;
