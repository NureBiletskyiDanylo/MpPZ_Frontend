import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import LoggedHeader from '../components/LoggedHeader.jsx'
import AlbumInfo, { formatISODate } from '../components/AlbumInfo.jsx'
import PageCard from '../components/PageCard.jsx'
import CreateAlbumForm from '../components/CreateAlbumForm.jsx'
import TemplateForm from '../components/TemplateForm.jsx';
import '../assets/AlbumPage.css'
import sort from '/sort.png'
import { useAuth } from '../AuthContext.jsx'
import { toast } from 'react-toastify'

function AlbumPage() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [pages, setPages] = useState([
    // { id: 1, title: "First birthday", date: "14/02/2025" },
    // { id: 2, title: "New Year party", date: "31/12/2024" },
    // { id: 3, title: "Summer vacation", date: "15/07/2024" }
  ])

  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('new-to-old');
  const [showTemplateForm, setShowTemplateForm] = useState(false);

  const navigate = useNavigate();

  const { user, isLoading } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchAlbum = async (token) => {
    fetch(`${API_URL}/api/Album/${albumId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json()) //TODO: add different status code handling
      .then(data => { console.log(data); setAlbum(data) })
      .catch(err => {
        console.error('Failed to fetch album: ', err);
      });
  };

  const fetchPages = async (token) => {
    fetch(`${API_URL}/api/Posts/album/${albumId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json()) //TODO: add different status code handling
      .then(data => { console.log(data); setPages(data) })
      .catch(err => {
        console.error('Failed to fetch pages: ', err);
      });
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    fetchAlbum(user.token);
    fetchPages(user.token);
  }, [user, isLoading]);

  if (!user) return null;

  const handleEditAlbum = async (formData) => {
    if (!formData.childDateOfBirth) {
      toast.error("Invalid birth date");
      return;
    }
    if (!formData.createdAt) {
      toast.error("Invalid date");
      return;
    }
    if (!formData.title) {
      toast.error("Please, enter name");
      return;
    }
    //XXX: we add albumId manually, as the form doesn't save it
    formData.id = albumId;

    fetch(`${API_URL}/api/Album`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        console.log(res);
        if (res.ok) {
          //NOTE: the endpoint doesn't return anything,
          // so we have to re-fetch the album
          toast.success('Album saved');
          fetchAlbum(user.token); //TODO: just re-set album data directly??
        } else {
          console.error('Error saving album: ' + res.status);
          toast.error('Error saving album');
        }
      })
      .catch(err => {
        console.error('Failed to post album:', err);
      });
    setShowAlbumForm(false);
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPages = [...filteredPages].sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-'))
    const dateB = new Date(b.date.split('/').reverse().join('-'))
    return sortOrder === 'new-to-old' ? dateB - dateA : dateA - dateB
  });

  return (
    <>
      <LoggedHeader />
      <div className='album-profile'>
        <AlbumInfo
          onEditAlbum={() => setShowAlbumForm(true)}
          onCreatePage={() => setShowTemplateForm(true)}
          album={album}
        />

        <div className='search-container'>
          <input type='text' value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search pages...'
          />
          <div className='sort-container'>
            <div className='sort-label'>
              <img src={sort} alt='Sort page' className='button-icon' />
              Sort
            </div>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="sort-select">
              <option value="new-to-old">Sort Newest to Oldest</option>
              <option value="old-to-new">Sort Oldest to Newest</option>
            </select>
          </div>
        </div>

        <div className='page-list'>
          {sortedPages.map((page) => (
            <PageCard
              key={page.id}
              imageSrc={page.images[0].imageUrl}
              title={page.title}
              date={formatISODate(page?.dateSetByUser)}
              pageId={page.id}
              onClick={() => navigate(`/pages/${page.id}`, {
                state: { albumId: albumId }
              })}
            >
              <div className='page-info'>
                <h3>{page.title}</h3>
                <p>{page.date}</p>
              </div>
            </PageCard>
          ))}
        </div>
      </div>
      {showAlbumForm &&
        (<CreateAlbumForm
          onCancel={() => setShowAlbumForm(false)}
          onSave={handleEditAlbum}
          user={user}
          defaultAlbum={album}
        />)}
      {showTemplateForm && <TemplateForm onClose={() => setShowTemplateForm(false)} albumId={albumId} />}
    </>
  )
}

export default AlbumPage
