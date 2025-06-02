import { useNavigate } from 'react-router';
import back from '/classic-back.png'
import '../assets/TemplateForm.css';

function TemplateForm({ onClose }) {
  const navigate = useNavigate();

  const templates = [
    { id: 1, name: 'Marine theme', preview: '/template-1.png' },
    { id: 2, name: 'Jungle theme', preview: '/template-2.png' },
    { id: 3, name: 'Only photo theme', preview: '/template-3.png' }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button className="back-button" onClick={onClose}>
            <img src={back} alt="Back" className="back-image" />
            Back
          </button>
          <h2 className="modal-title">Choose Your Perfect Page Template</h2>
        </div>
        
        <div className="templates-grid">
          {templates.map(template => (
            <div 
              key={template.id}
              className="template-card"
              onClick={() => navigate(`/create/${template.id}`)}
            >
              <img src={template.preview} alt={template.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TemplateForm;