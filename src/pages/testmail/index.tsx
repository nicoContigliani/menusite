"use client"
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // const response = await fetch('/api/send-email', { // URL correcta para el App Router
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });



      const data = await response.json();

      if (response.ok) {
        setMessage('Correo electrónico enviado correctamente.');
        setFormData({ name: '', email: '', message: '' }); // Limpiar el formulario
      } else {
        setMessage(`Error al enviar el correo electrónico: ${data.error}`);
      }
    } catch (error) {
      setMessage('Ocurrió un error al enviar el correo electrónico.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <p>{message}</p>}
      <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required /><br />
      <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required /><br />
      <textarea name="message" placeholder="Mensaje" value={formData.message} onChange={handleChange} required></textarea><br />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;