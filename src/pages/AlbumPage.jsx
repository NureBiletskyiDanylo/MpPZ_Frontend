import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import LoggedHeader from '../components/LoggedHeader.jsx'
import AlbumInfo from '../components/AlbumInfo.jsx'
import PageCard from '../components/PageCard.jsx'
import CreateAlbumForm from '../components/CreateAlbumForm.jsx'
import TemplateForm from '../components/TemplateForm.jsx';
import '../assets/AlbumPage.css'
import sort from '/sort.png'

function AlbumPage() {
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('new-to-old');
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const navigate = useNavigate();

  const [pages, setPages] = useState([
    { id: 1, title: "First birthday", date: "14/02/2025" },
    { id: 2, title: "New Year party", date: "31/12/2024" },
    { id: 3, title: "Summer vacation", date: "15/07/2024" }
  ])

  const handleEditAlbum = () => {
    setShowAlbumForm(false);
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedPages = [...filteredPages].sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-'))
    const dateB = new Date(b.date.split('/').reverse().join('-'))
    return sortOrder === 'new-to-old' ? dateB - dateA : dateA - dateB
  })

  return (
    <>
      <LoggedHeader />
      <div className='album-profile'>
        <AlbumInfo
          onEditAlbum={() => setShowAlbumForm(true)}
          onCreatePage={() => setShowTemplateForm(true)}
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
              pageId={page.id}
              templateId={page.templateId}
              onClick={() => navigate(`/page/${page.id}`)}
            >
              <div className='page-info'>
                <h3>{page.title}</h3>
                <p>{page.date}</p>
              </div>
            </PageCard>
          ))}
        </div>
      </div>
      {showAlbumForm && (<CreateAlbumForm onCancel={() => setShowAlbumForm(false)} onSave={handleEditAlbum} />)}
      {showTemplateForm && <TemplateForm onClose={() => setShowTemplateForm(false)} />}
    </>
  )
}

export default AlbumPage
