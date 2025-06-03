import Header from "../Header";
import LoggedHeader from "../components/LoggedHeader";
import { useAuth } from "../AuthContext";
import '../assets/home.css'
import { useEffect, useState } from "react";
import AlbumCard from "../components/AlbumCard";
import { formatISODate } from "../components/AlbumInfo";

export default function Login() {
  const { user, isLoading } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [sharedAlbums, setSharedAlbums] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchAlbums = async (token) => {
    fetch(`${API_URL}/api/Album/my-albums`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => setAlbums(data))
      .catch(err => {
        console.error('Failed to fetch albums:', err);
      });

    fetch(`${API_URL}/api/Album/get-allowed-albums`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => setSharedAlbums(data))
      .catch(err => {
        console.error('Failed to fetch shared albums:', err);
      });
  }

  useEffect(() => {
    if (isLoading || !user) return;
    fetchAlbums(user.token);
    // console.log(albums)
    // setSharedAlbums()
  }, [user, isLoading]);

  return (
    <>
      {user ? (
        <>
          <LoggedHeader />
          <h1 style={{ color: '#8a5a44' }}>Welcome, {user.username}</h1>
          {albums.length ? <h2 style={{ color: '#8a5a44' }}>Your albums:</h2> : <h2 style={{ color: '#8a5a44' }}>You have no albums yet</h2>}
          <div className='album-list-home'>
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                id={album.id}
                image={album.albumProfileImage.imageUrl}
                title={album.title}
                createdAt={formatISODate(album.createdAt)}
                pages={album?.pages}
              />
            ))}
          </div>
          {sharedAlbums.length ? <>
            <h2 style={{ color: '#8a5a44' }}>Shared albums: </h2>
            <div className="album-list-home">
              {sharedAlbums.filter(shared => !albums.some(album => album.id === shared.id)).map((album) => (
                <AlbumCard
                  key={album.id}
                  id={album.id}
                  image={album.albumProfileImage.imageUrl}
                  title={album.title}
                  createdAt={formatISODate(album.createdAt)}
                  pages={album?.pages}
                />
              ))}
            </div>
          </> : null}
        </>
      ) : (
        <>
          <Header />
          <div className="showcase">
            <div className="pitch">
              <h1>Preserve every childhood smile in digital format</h1>
              <div className="pitch-main">
                <img src="/father-and-daughter.png" />
                <div className="pitch-cards">
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
