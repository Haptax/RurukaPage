
"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Send, CheckCircle } from "lucide-react"
import { useLanguage } from "../context/LanguageContext";
import { t } from "../i18n";
import emailjs from '@emailjs/browser';


export function ContactSection() {
  const { lang } = useLanguage();
  const translations = t(lang);

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Estados de UI
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Manejar cambios en los campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = lang === 'es' ? 'El nombre es requerido' : 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = lang === 'es' ? 'El email es requerido' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = lang === 'es' ? 'Email inválido' : 'Invalid email';
    }

    if (!formData.subject) {
      newErrors.subject = lang === 'es' ? 'Por favor selecciona un asunto' : 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = lang === 'es' ? 'El mensaje es requerido' : 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    // Función para obtener el texto completo del asunto
  const getSubjectText = (value: string) => {
    const subjects = {
      "alianza": lang === "es" ? "Alianza empresarial" : "Business partnership",
      "alfarero": lang === "es" ? "Soy alfarero/artesano" : "I'm a potter/artisan",
      "residuos": lang === "es" ? "Tengo lodos residuales" : "I have residual sludge",
      "otro": lang === "es" ? "Otro" : "Other"
    };
    return subjects[value as keyof typeof subjects] || value;
  };

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Configurar EmailJS (estas claves las obtendremos de EmailJS)
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key';

      // Enviar email
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,                    // Para {{name}} en el template
          from_email: formData.email,             // Para {{from_email}} en el template
          subject: getSubjectText(formData.subject), // Texto completo del asunto
          message: formData.message,              // Para {{message}} en el template
          email: formData.email,                  // Para {{email}} en Reply To
          to_email: 'info@ruruka.co'             // Para {{to_email}} en el template
        },
        publicKey
      );

      setSubmitStatus('success');
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[rgb(var(--ruruka-primary))] mb-4">{translations.contactSection.title}</h2>
          <div className="w-24 h-1 bg-[rgb(var(--ruruka-primary))] mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
            {translations.contactSection.subtitle}
          </p>
        </div>

        <Card className="bg-white shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-[rgb(var(--ruruka-primary))] mb-6">{lang === "es" ? "Envíanos un mensaje" : "Send us a message"}</h3>
              
              {/* Mensaje de éxito */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {lang === "es" ? "¡Mensaje enviado exitosamente! Te contactaremos pronto." : "Message sent successfully! We'll contact you soon."}
                </div>
              )}

              {/* Mensaje de error */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {lang === "es" ? "Error al enviar el mensaje. Por favor intenta nuevamente." : "Error sending message. Please try again."}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    {translations.contactSection.name} *
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ruruka-primary))] ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={lang === "es" ? "Tu nombre completo" : "Your full name"}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    {translations.contactSection.email} *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ruruka-primary))] ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={lang === "es" ? "tu@email.com" : "your@email.com"}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    {lang === "es" ? "Asunto" : "Subject"} *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ruruka-primary))] ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">{lang === "es" ? "Selecciona una opción" : "Select an option"}</option>
                    <option value="alianza">{lang === "es" ? "Alianza empresarial" : "Business partnership"}</option>
                    <option value="alfarero">{lang === "es" ? "Soy alfarero/artesano" : "I'm a potter/artisan"}</option>
                    <option value="residuos">{lang === "es" ? "Tengo lodos residuales" : "I have residual sludge"}</option>
                    <option value="otro">{lang === "es" ? "Otro" : "Other"}</option>
                  </select>
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    {translations.contactSection.message} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ruruka-primary))] ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={lang === "es" ? "Cuéntanos más sobre tu consulta..." : "Tell us more about your inquiry..."}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-[rgb(var(--ruruka-primary))] text-white font-bold rounded-lg transition duration-300 hover:bg-[rgb(var(--ruruka-dark))] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {lang === "es" ? "Enviando..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {translations.contactSection.send}
                    </>
                  )}
                </Button>
              </form>
            </div>
            <div className="md:w-1/2 bg-[rgb(var(--color-primary-1))] p-8 md:p-12 text-white flex flex-col justify-center items-center">
              <h3 className="text-2xl font-bold mb-4">{lang === "es" ? "Contáctanos" : "Contact us"}</h3>
              <div className="flex flex-col items-center space-y-6 w-full">
                <div className="flex items-center justify-center w-full">
                  <Mail className="w-7 h-7 mr-3" />
                  <a href="mailto:info@ruruka.co" className="underline text-white hover:text-gray-200 text-lg font-semibold">info@ruruka.co</a>
                </div>
                <div className="flex flex-col items-center w-full">
                  <h4 className="font-bold mb-3 text-lg">{lang === "es" ? "Síguenos en redes sociales" : "Follow us on social media"}</h4>
                  <div className="flex flex-row justify-center items-center gap-6 mt-1">
                    <a
                      href="https://www.facebook.com/profile.php?id=100090656813352"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full p-3 transition duration-300 hover:bg-white hover:bg-opacity-20"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-8 h-8" />
                    </a>
                    <a
                      href="https://www.youtube.com/@RurukaPy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full p-3 transition duration-300 hover:bg-white hover:bg-opacity-20"
                      aria-label="YouTube"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.36 0 12 0 12s0 3.64.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.772 20.5 12 20.5 12 20.5s7.228 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.64 24 12 24 12s0-3.64-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a
                      href="https://www.instagram.com/ruruka.co/?hl=es-la"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full p-3 transition duration-300 hover:bg-white hover:bg-opacity-20"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-8 h-8" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/ruruka?trk=similar-pages"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full p-3 transition duration-300 hover:bg-white hover:bg-opacity-20"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-8 h-8" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
