import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useAuth } from "../AuthContext";
import CreatePageTemplate1 from "./CreatePageTemplate1";
import CreatePageTemplate2 from "./CreatePageTemplate2";
import CreatePageTemplate3 from "./CreatePageTemplate3";

const API_URL = import.meta.env.VITE_API_URL;

export default function PageViewWrapper() {
  const [pageData, setPageData] = useState(null);
  const { user, isLoading } = useAuth();
  const { pageId } = useParams();
  const navigate = useNavigate();


  const fetchPageData = (pageId, token) => {
    fetch(`${API_URL}/api/Posts/${pageId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPageData({
          image: data.images?.[0]?.imageUrl || '',
          title: data.title,
          text: data.text,
          date: data.dateSetByUser.split('T')[0],
          templateId: data.templateId
        });
      })
      .catch(err => console.error('Failed to load post:', err));
  }

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPageData(pageId, user.token);
  }, [user, isLoading])

  if (!user) return null;

  if (!pageData) return <div>Loading...</div>;

  switch (pageData.templateId) {
    case 1: return <CreatePageTemplate1 mode="view" pageData={pageData} />;
    case 2: return <CreatePageTemplate2 mode="view" pageData={pageData} />;
    case 3: return <CreatePageTemplate3 mode="view" pageData={pageData} />;
    default: return <Navigate to="/" />;
  }
}
