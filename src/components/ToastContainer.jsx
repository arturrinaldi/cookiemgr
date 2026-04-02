import { useToasts } from '../utils/toast';
import './Toast.css';

const icons = {
  success: '✓',
  error: '✕',
  default: '🍪',
};

export default function ToastContainer() {
  const toasts = useToasts();
  if (!toasts.length) return null;
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span>{icons[t.type] || icons.default}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}
