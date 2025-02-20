import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const useFetchForm = () => {
  const [forms, setForms] = useState([]);
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [errorTitle, setErrorTitle] = useState(null);

  const fetchForm = useCallback(async () => {
    setLoadingTitle(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/forms`);
      console.log('Full API Response:', response);

      if (response.headers['content-type'].includes('application/json') && Array.isArray(response.data)) {
        const filteredForms = response.data.map((form) => ({
          id: form.id,
          userId: form.userId,
          user: {
            id: form.user?.id || null,
            username: form.user?.username || '',
            email: form.user?.email || '',
          },
          title: form.title || '',
          descriptions: form.descriptions || '',
          questions: Array.isArray(form.questions)
            ? form.questions.map((q) => ({
                id: q.id || null,
                title: q.title || '',
                type: q.type || '',
                descriptions: q.descriptions || '',
                visible: q.visible || 0,
              }))
            : [],
        }));

        setForms(filteredForms);
      } else {
        throw new Error('Invalid response format: Expected an array of forms');
      }
    } catch (err) {
      console.error('Error fetching forms:', err);
      setErrorTitle(err.message || 'Error fetching forms');
    } finally {
      setLoadingTitle(false);
    }
  }, []);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  const getFormById = useCallback((formId) => {
    return forms.find((form) => form.id === Number(formId)) || null;
  }, [forms]);

  return { forms, loadingTitle, errorTitle, getFormById };
};


export default useFetchForm;
