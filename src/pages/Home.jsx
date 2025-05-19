import Header from "../Header";
import { useAuth } from "../AuthContext";
import '../assets/home.css'

export default function Login() {
  const { user } = useAuth(); //FIXME: redundant auth check: split header component?
  return (
    <>
      <Header />
      {user ? (
        <h1>Hi {user.username}</h1> //FIXME: placeholder for actual logged-in user homepage
      ) : (
        <div className="showcase">
          <img src="/father-and-daughter.png" />
          <div className="pitch">
            <h1>Preserve every childhood smile in digital format</h1>
            <div className="pitch-card">
              <div className="pitch-card-number">
                <h1>1</h1>
              </div>
              <div className="pitch-card-text">
                <h2>Design it</h2>
                <p>Use templates. Add photos, text, decorations.</p>
              </div>
            </div>
            <div className="pitch-card">
              <div className="pitch-card-number">
                <h1>2</h1>
              </div>
              <div className="pitch-card-text">
                <h2>Share your memories</h2>
                <p>Invite family and friends to view your album.</p>
              </div>
            </div>
          </div>
          <img src="mother.png" />
        </div>
      )}
    </>
  );
}
