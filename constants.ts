

import { Service, Testimonial, ServiceDetail, Language, Product } from './types';

export type { Language }; // Re-export Language type

export const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'AR', name: 'العربية', flag: '🇸🇦' },
];

export const TEXT_CONTENT = {
  EN: {
    nav: {
      services: 'Services',
      shop: 'Shop',
      tools: 'Tools',
      about: 'About',
      ai: 'AI Audit',
      contact: 'Contact',
      quote: 'Get Quote',
      backToHome: 'Back to Home',
      blog: 'Blog',
      dashboard: 'Dashboard',
      logout: 'Sign Out',
      login: 'Login',
      adminPanel: 'Admin Panel',
      myDashboard: 'My Dashboard'
    },
    hero: {
      badge: 'Accepting New Clients for 2025',
      title: 'We Build Digital Experiences That Scale.',
      subtitle: 'ValuePixels helps brands navigate the digital landscape with modern web development, data-driven SEO, and AI-powered strategies. We turn visitors into loyal customers.',
      ctaPrimary: 'Start Project',
      ctaSecondary: 'Our Services'
    },
    services: {
      heading: 'Our Expertise',
      subheading: 'Comprehensive Digital Solutions'
    },
    about: {
      title: 'Future-Proof Digital Engineering',
      subtitle: 'We merge aesthetic brilliance with rigorous engineering. Our approach creates digital ecosystems that are secure, scalable, and stunningly effective. We don\'t just build websites; we build business assets.',
      stat_satisfaction: 'Client Satisfaction Rate',
      features: [
        { title: "Clean Architecture", desc: "Modular, scalable codebases built for long-term growth and easy maintenance." },
        { title: "Enterprise Security", desc: "Bank-grade security protocols standard on all projects to protect your data." },
        { title: "Transparent Process", desc: "Real-time updates, clear communication, and full asset ownership upon delivery." }
      ]
    },
    testimonials: {
      heading: 'Trusted by Industry Leaders'
    },
    contact: {
      title: 'Ready to Fix Your Site?',
      subtitle: 'Fill out the form below or email us directly to discuss your project requirements.',
      name: 'Full Name',
      email: 'Email Address',
      service: 'Select Service',
      details: 'Project Details & Goals',
      submit: 'Send Message'
    },
    footer: {
      about: "We're a full-service digital agency specializing in creating exceptional online experiences that drive business growth through technology and design.",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      quickLinks: "Quick Links",
      services: "Services & More",
      contactInfo: "Contact Info"
    },
    servicePage: {
      back: 'Back to Services',
      platforms: 'Platforms We Master',
      plans: 'Service Plans',
      popular: 'Most Popular',
      selectPlan: 'Select Plan',
      customTitle: 'Need something custom?',
      customDesc: 'We understand every business is unique. Contact us for a custom quote tailored to your specific requirements.',
      talkExpert: 'Talk to an Expert'
    },
    shop: {
      title: 'Digital Store',
      subtitle: 'Premium assets, templates, and guides to accelerate your digital growth.',
      searchPlaceholder: 'Search products...',
      buyNow: 'Buy Now',
      noProducts: 'No products found matching your search.'
    },
    blog: {
      title: 'Latest Insights',
      subtitle: 'News, updates, and expert advice on web development, SEO, and digital growth.',
      readMore: 'Read Article',
      noPosts: 'No posts published yet. Check back soon!',
      back: 'Back to Blog'
    },
    tools: {
      title: 'Webmaster Tools',
      subtitle: 'A comprehensive suite of 20+ free utilities for developers, designers, and site owners.',
      selectTool: 'Select a Tool',
      copy: 'Copy',
      copied: 'Copied!',
      generate: 'Generate',
      convert: 'Convert',
      reset: 'Reset',
      download: 'Download',
      input: 'Input',
      output: 'Result',
      list: {
        section: { title: 'AI Section Generator', desc: 'Get ready-made Tailwind CSS sections.' },
        password: { title: 'Password Gen', desc: 'Create strong, secure passwords instantly.' },
        meta: { title: 'Meta Tag Gen', desc: 'Generate SEO-friendly meta tags.' },
        pxrem: { title: 'PX to REM', desc: 'Convert pixels to rem units.' },
        slug: { title: 'Slug Gen', desc: 'Turn titles into clean URLs.' },
        wordcount: { title: 'Word Counter', desc: 'Count words, chars, and reading time.' },
        color: { title: 'Color Converter', desc: 'Convert between HEX and RGB.' },
        json: { title: 'JSON Formatter', desc: 'Validate and beautify JSON.' },
        qr: { title: 'QR Code Gen', desc: 'Create QR codes for URLs.' },
        case: { title: 'Case Converter', desc: 'Uppercase, lowercase, camelCase, etc.' },
        lorem: { title: 'Lorem Ipsum', desc: 'Generate placeholder text.' },
        base64: { title: 'Base64 Encoder', desc: 'Encode and decode Base64 strings.' },
        url: { title: 'URL Encoder', desc: 'Encode and decode URLs safely.' },
        uuid: { title: 'UUID Gen', desc: 'Generate unique v4 identifiers.' },
        timestamp: { title: 'Unix Timestamp', desc: 'Convert dates to timestamps.' },
        aspect: { title: 'Aspect Ratio', desc: 'Calculate dimensions and ratios.' },
        shadow: { title: 'Box Shadow', desc: 'CSS box-shadow generator.' },
        html: { title: 'HTML Entities', desc: 'Encode/Decode HTML special chars.' },
        markdown: { title: 'Markdown Viewer', desc: 'Preview Markdown as HTML.' },
        binary: { title: 'Binary Text', desc: 'Convert text to binary and back.' },
        ua: { title: 'User Agent', desc: 'Parse and view your browser info.' },
        jwt: { title: 'JWT Decoder', desc: 'Read payload from JSON Web Tokens.' }
      }
    },
    order: {
      title: 'Checkout & Payment',
      productTitle: 'Complete Purchase',
      cancel: 'Cancel Order',
      detailsTitle: 'Order Details',
      itemName: 'Item Name',
      price: 'Price',
      methodTitle: 'Select Payment Method',
      noMethods: 'No payment methods configured. Please contact support.',
      transferText: 'Please transfer',
      to: 'to',
      confirmTitle: 'Confirm Payment',
      yourName: 'Your Full Name',
      txnId: 'Transaction ID / Ref #',
      proof: 'Proof of Payment (Screenshot URL)',
      demoNote: 'For demo, paste any image URL.',
      submit: 'Submit Payment Proof',
      verifying: 'Verifying...',
      summaryTitle: 'Order Summary',
      item: 'Item',
      plan: 'Plan',
      subtotal: 'Subtotal',
      total: 'Total',
      note: 'Payments are manually verified by our team. You will receive an email confirmation once approved.'
    },
    userDashboard: {
      sidebar: {
        orders: 'My Orders',
        profile: 'Profile Settings',
        signout: 'Sign Out'
      },
      orders: {
        title: 'My Orders',
        subtitle: 'Track status and payment verification.',
        newOrder: 'New Order',
        status: 'Status',
        amount: 'Amount',
        noOrders: 'No active orders found.',
        statuses: {
          active: 'Active',
          pending_verification: 'Verifying',
          cancelled: 'Cancelled',
          completed: 'Completed'
        }
      },
      profile: {
        title: 'Profile Settings',
        name: 'Full Name',
        email: 'Email Address',
        update: 'Update Profile'
      }
    }
  },
  ES: {
    nav: {
      services: 'Servicios',
      shop: 'Tienda',
      tools: 'Herramientas',
      about: 'Nosotros',
      ai: 'Auditoría IA',
      contact: 'Contacto',
      quote: 'Cotizar',
      backToHome: 'Volver al Inicio',
      blog: 'Blog',
      dashboard: 'Panel',
      logout: 'Cerrar Sesión',
      login: 'Iniciar Sesión',
      adminPanel: 'Panel de Admin',
      myDashboard: 'Mi Panel'
    },
    hero: {
      badge: 'Aceptando Nuevos Clientes 2025',
      title: 'Experiencias Digitales que Escalan.',
      subtitle: 'ValuePixels ayuda a las marcas a navegar el paisaje digital con desarrollo web moderno, SEO basado en datos y estrategias impulsadas por IA.',
      ctaPrimary: 'Iniciar Proyecto',
      ctaSecondary: 'Nuestros Servicios'
    },
    services: {
      heading: 'Nuestra Experiencia',
      subheading: 'Soluciones Digitales Integrales'
    },
    about: {
      title: 'Ingeniería Digital a Prueba de Futuro',
      subtitle: 'Fusionamos brillantez estética con ingeniería rigurosa. Nuestro enfoque crea ecosistemas digitales seguros, escalables y efectivos. No solo construimos sitios web; construimos activos comerciales.',
      stat_satisfaction: 'Tasa de Satisfacción',
      features: [
        { title: "Arquitectura Limpia", desc: "Bases de código modulares y escalables construidas para el crecimiento a largo plazo." },
        { title: "Seguridad Empresarial", desc: "Protocolos de seguridad de grado bancario estándar en todos los proyectos." },
        { title: "Proceso Transparente", desc: "Actualizaciones en tiempo real, comunicación clara y propiedad total de los activos." }
      ]
    },
    testimonials: {
      heading: 'Líderes de la Industria Confían en Nosotros'
    },
    contact: {
      title: '¿Listo para transformar tu sitio?',
      subtitle: 'Complete el formulario a continuación o envíenos un correo electrónico directamente.',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      service: 'Seleccionar Servicio',
      details: 'Detalles del Proyecto y Objetivos',
      submit: 'Enviar Mensaje'
    },
    footer: {
      about: "Somos una agencia digital de servicio completo especializada en crear experiencias en línea excepcionales que impulsan el crecimiento empresarial a través de la tecnología y el diseño.",
      rights: "Todos los derechos reservados.",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      quickLinks: "Enlaces Rápidos",
      services: "Servicios y Más",
      contactInfo: "Información de Contacto"
    },
    servicePage: {
      back: 'Volver a Servicios',
      platforms: 'Plataformas que Dominamos',
      plans: 'Planes de Servicio',
      popular: 'Más Popular',
      selectPlan: 'Seleccionar Plan',
      customTitle: '¿Necesitas algo personalizado?',
      customDesc: 'Entendemos que cada negocio es único. Contáctenos para una cotización personalizada adaptada a sus requisitos específicos.',
      talkExpert: 'Hablar con un Experto'
    },
    shop: {
      title: 'Tienda Digital',
      subtitle: 'Activos premium, plantillas y guías para acelerar su crecimiento digital.',
      searchPlaceholder: 'Buscar productos...',
      buyNow: 'Comprar Ahora',
      noProducts: 'No se encontraron productos que coincidan con su búsqueda.'
    },
    blog: {
      title: 'Últimas Perspectivas',
      subtitle: 'Noticias, actualizaciones y consejos de expertos sobre desarrollo web, SEO y crecimiento digital.',
      readMore: 'Leer Artículo',
      noPosts: 'Aún no hay publicaciones. ¡Vuelve pronto!',
      back: 'Volver al Blog'
    },
    tools: {
      title: 'Herramientas Web',
      subtitle: 'Más de 20 utilidades gratuitas para desarrolladores y propietarios de sitios.',
      selectTool: 'Seleccionar Herramienta',
      copy: 'Copiar',
      copied: '¡Copiado!',
      generate: 'Generar',
      convert: 'Convertir',
      reset: 'Reiniciar',
      download: 'Descargar',
      input: 'Entrada',
      output: 'Resultado',
      list: {
        section: { title: 'Generador de Secciones', desc: 'Obtén secciones Tailwind CSS listas para usar.' },
        password: { title: 'Generador de Contraseñas', desc: 'Crea contraseñas seguras al instante.' },
        meta: { title: 'Generador de Meta Tags', desc: 'Genera etiquetas SEO para tu sitio.' },
        pxrem: { title: 'PX a REM', desc: 'Convierte píxeles a unidades rem.' },
        slug: { title: 'Generador de Slugs', desc: 'Convierte títulos en URLs amigables.' },
        wordcount: { title: 'Contador de Palabras', desc: 'Cuenta palabras, caracteres y tiempo de lectura.' },
        color: { title: 'Conversor de Color', desc: 'Convierte entre formatos HEX y RGB.' },
        json: { title: 'Formateador JSON', desc: 'Valida y embellece tus datos JSON.' },
        qr: { title: 'Generador de QR', desc: 'Crea códigos QR para URLs o texto.' },
        case: { title: 'Convertidor de Mayúsculas', desc: 'Mayúsculas, minúsculas, camelCase, etc.' },
        lorem: { title: 'Lorem Ipsum', desc: 'Generar texto de marcador de posición.' },
        base64: { title: 'Codificador Base64', desc: 'Codificar y decodificar cadenas Base64.' },
        url: { title: 'Codificador URL', desc: 'Codificar y decodificar URLs de forma segura.' },
        uuid: { title: 'Generador UUID', desc: 'Generar identificadores únicos v4.' },
        timestamp: { title: 'Marca de tiempo Unix', desc: 'Convertir fechas a marcas de tiempo.' },
        aspect: { title: 'Relación de Aspecto', desc: 'Calcular dimensiones y proporciones.' },
        shadow: { title: 'Sombra de Caja', desc: 'Generador de box-shadow CSS.' },
        html: { title: 'Entidades HTML', desc: 'Codificar/Decodificar caracteres HTML especiales.' },
        markdown: { title: 'Visor Markdown', desc: 'Previsualizar Markdown como HTML.' },
        binary: { title: 'Texto Binario', desc: 'Convertir texto a binario y viceversa.' },
        ua: { title: 'Agente de Usuario', desc: 'Analizar y ver la información de tu navegador.' },
        jwt: { title: 'Decodificador JWT', desc: 'Leer la carga útil de los tokens web JSON.' }
      }
    },
    order: {
      title: 'Pago y Facturación',
      productTitle: 'Completar Compra',
      cancel: 'Cancelar Orden',
      detailsTitle: 'Detalles de la Orden',
      itemName: 'Nombre del Artículo',
      price: 'Precio',
      methodTitle: 'Seleccionar Método de Pago',
      noMethods: 'No hay métodos de pago configurados. Por favor contacte soporte.',
      transferText: 'Por favor transfiera',
      to: 'a',
      confirmTitle: 'Confirmar Pago',
      yourName: 'Su Nombre Completo',
      txnId: 'ID de Transacción / Ref #',
      proof: 'Comprobante de Pago (URL de Captura)',
      demoNote: 'Para demo, pegue cualquier URL de imagen.',
      submit: 'Enviar Comprobante',
      verifying: 'Verificando...',
      summaryTitle: 'Resumen de Orden',
      item: 'Artículo',
      plan: 'Plan',
      subtotal: 'Subtotal',
      total: 'Total',
      note: 'Los pagos son verificados manualmente por nuestro equipo. Recibirá un correo de confirmación una vez aprobado.'
    },
    userDashboard: {
      sidebar: {
        orders: 'Mis Órdenes',
        profile: 'Configuración de Perfil',
        signout: 'Cerrar Sesión'
      },
      orders: {
        title: 'Mis Órdenes',
        subtitle: 'Rastree el estado y verificación de pago.',
        newOrder: 'Nueva Orden',
        status: 'Estado',
        amount: 'Monto',
        noOrders: 'No se encontraron órdenes activas.',
        statuses: {
          active: 'Activo',
          pending_verification: 'Verificando',
          cancelled: 'Cancelado',
          completed: 'Completado'
        }
      },
      profile: {
        title: 'Configuración de Perfil',
        name: 'Nombre Completo',
        email: 'Correo Electrónico',
        update: 'Actualizar Perfil'
      }
    }
  },
  FR: {
    nav: {
      services: 'Services',
      shop: 'Boutique',
      tools: 'Outils',
      about: 'À propos',
      ai: 'Audit IA',
      contact: 'Contact',
      quote: 'Devis',
      backToHome: "Retour à l'accueil",
      blog: 'Blog',
      dashboard: 'Tableau de bord',
      logout: 'Déconnexion',
      login: 'Connexion',
      adminPanel: 'Panneau Admin',
      myDashboard: 'Mon Tableau de bord'
    },
    hero: {
      badge: 'Accepter de nouveaux clients pour 2025',
      title: 'Nous créons des expériences numériques évolutives.',
      subtitle: "ValuePixels aide les marques à naviguer dans le paysage numérique avec un développement web moderne, un référencement basé sur les données et des stratégies basées sur l'IA.",
      ctaPrimary: 'Démarrer le projet',
      ctaSecondary: 'Nos services'
    },
    services: {
      heading: 'Notre expertise',
      subheading: 'Solutions numériques complètes'
    },
    about: {
      title: 'Ingénierie numérique à l\'épreuve du futur',
      subtitle: 'Nous fusionnons la brillance esthétique avec une ingénierie rigoureuse. Notre approche crée des écosystèmes numériques sécurisés, évolutifs et incroyablement efficaces.',
      stat_satisfaction: 'Taux de satisfaction client',
      features: [
        { title: "Architecture propre", desc: "Codes modulaires et évolutifs conçus pour une croissance à long terme." },
        { title: "Sécurité d'entreprise", desc: "Protocoles de sécurité de niveau bancaire standard sur tous les projets." },
        { title: "Processus transparent", desc: "Mises à jour en temps réel, communication claire et propriété totale des actifs." }
      ]
    },
    testimonials: {
      heading: 'Approuvé par les leaders de l\'industrie'
    },
    contact: {
      title: 'Prêt à transformer votre site ?',
      subtitle: 'Remplissez le formulaire ci-dessous ou envoyez-nous un e-mail directement.',
      name: 'Nom complet',
      email: 'Adresse e-mail',
      service: 'Sélectionner le service',
      details: 'Détails du projet',
      submit: 'Envoyer le message'
    },
    footer: {
      about: "Nous sommes une agence numérique complète spécialisée dans la création d'expériences en ligne exceptionnelles qui stimulent la croissance des entreprises.",
      rights: "Tous droits réservés.",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      quickLinks: "Liens rapides",
      services: "Services et plus",
      contactInfo: "Infos contact"
    },
    servicePage: {
      back: 'Retour aux services',
      platforms: 'Plateformes maîtrisées',
      plans: 'Plans de service',
      popular: 'Plus populaire',
      selectPlan: 'Choisir ce plan',
      customTitle: 'Besoin de sur-mesure ?',
      customDesc: 'Chaque entreprise est unique. Contactez-nous pour un devis personnalisé.',
      talkExpert: 'Parler à un expert'
    },
    shop: {
      title: 'Boutique Numérique',
      subtitle: 'Actifs premium, modèles et guides pour accélérer votre croissance numérique.',
      searchPlaceholder: 'Rechercher des produits...',
      buyNow: 'Acheter',
      noProducts: 'Aucun produit trouvé.'
    },
    blog: {
      title: 'Dernières Idées',
      subtitle: 'Actualités, mises à jour et conseils d\'experts sur le développement web, le référencement et la croissance numérique.',
      readMore: 'Lire l\'article',
      noPosts: 'Aucun article publié pour le moment.',
      back: 'Retour au Blog'
    },
    tools: {
        title: 'Outils Webmaster',
        subtitle: 'Une suite complète de 20+ utilitaires gratuits.',
        selectTool: 'Sélectionner un outil',
        copy: 'Copier',
        copied: 'Copié !',
        generate: 'Générer',
        convert: 'Convertir',
        reset: 'Réinitialiser',
        download: 'Télécharger',
        input: 'Entrée',
        output: 'Résultat',
        list: {
          section: { title: 'Générateur de Section', desc: 'Obtenez des sections Tailwind CSS prêtes.' },
          password: { title: 'Générateur MDP', desc: 'Créez des mots de passe sécurisés.' },
          meta: { title: 'Générateur Meta', desc: 'Générez des balises SEO.' },
          pxrem: { title: 'PX en REM', desc: 'Convertissez les pixels en rem.' },
          slug: { title: 'Générateur Slug', desc: 'Créez des URLs propres.' },
          wordcount: { title: 'Compteur de Mots', desc: 'Comptez mots et caractères.' },
          color: { title: 'Convertisseur Couleur', desc: 'HEX vers RGB et inversement.' },
          json: { title: 'Formateur JSON', desc: 'Validez et embellissez JSON.' },
          qr: { title: 'Générateur QR', desc: 'Créez des codes QR.' },
          case: { title: 'Convertisseur Casse', desc: 'Majuscules, minuscules, etc.' },
          lorem: { title: 'Lorem Ipsum', desc: 'Texte de remplissage.' },
          base64: { title: 'Encodeur Base64', desc: 'Encoder/Décoder Base64.' },
          url: { title: 'Encodeur URL', desc: 'Encoder/Décoder URLs.' },
          uuid: { title: 'Générateur UUID', desc: 'Identifiants uniques v4.' },
          timestamp: { title: 'Timestamp Unix', desc: 'Dates en timestamps.' },
          aspect: { title: 'Ratio d\'Aspect', desc: 'Calculer les dimensions.' },
          shadow: { title: 'Ombre de Boîte', desc: 'Générateur box-shadow.' },
          html: { title: 'Entités HTML', desc: 'Encoder caractères spéciaux.' },
          markdown: { title: 'Visionneuse Markdown', desc: 'Aperçu HTML.' },
          binary: { title: 'Texte Binaire', desc: 'Texte vers binaire.' },
          ua: { title: 'User Agent', desc: 'Infos navigateur.' },
          jwt: { title: 'Décodeur JWT', desc: 'Lire tokens JSON Web.' }
        }
    },
    order: {
      title: 'Paiement',
      productTitle: 'Finaliser l\'achat',
      cancel: 'Annuler',
      detailsTitle: 'Détails de la commande',
      itemName: 'Nom de l\'article',
      price: 'Prix',
      methodTitle: 'Méthode de paiement',
      noMethods: 'Aucune méthode configurée.',
      transferText: 'Veuillez transférer',
      to: 'à',
      confirmTitle: 'Confirmer le paiement',
      yourName: 'Votre nom complet',
      txnId: 'ID Transaction / Réf #',
      proof: 'Preuve de paiement (URL)',
      demoNote: 'Pour la démo, collez une URL d\'image.',
      submit: 'Envoyer la preuve',
      verifying: 'Vérification...',
      summaryTitle: 'Résumé',
      item: 'Article',
      plan: 'Plan',
      subtotal: 'Sous-total',
      total: 'Total',
      note: 'Les paiements sont vérifiés manuellement.'
    },
    userDashboard: {
        sidebar: {
          orders: 'Mes Commandes',
          profile: 'Profil',
          signout: 'Déconnexion'
        },
        orders: {
          title: 'Mes Commandes',
          subtitle: 'Suivez le statut et la vérification.',
          newOrder: 'Nouvelle Commande',
          status: 'Statut',
          amount: 'Montant',
          noOrders: 'Aucune commande active.',
          statuses: {
            active: 'Actif',
            pending_verification: 'Vérification',
            cancelled: 'Annulé',
            completed: 'Terminé'
          }
        },
        profile: {
          title: 'Paramètres du Profil',
          name: 'Nom Complet',
          email: 'Email',
          update: 'Mettre à jour'
        }
    }
  },
  DE: {
    nav: {
      services: 'Leistungen',
      shop: 'Shop',
      tools: 'Tools',
      about: 'Über uns',
      ai: 'AI Audit',
      contact: 'Kontakt',
      quote: 'Angebot',
      backToHome: 'Zurück',
      blog: 'Blog',
      dashboard: 'Dashboard',
      logout: 'Abmelden',
      login: 'Anmelden',
      adminPanel: 'Admin Panel',
      myDashboard: 'Mein Dashboard'
    },
    hero: {
      badge: 'Neue Kunden für 2025 willkommen',
      title: 'Wir bauen skalierbare digitale Erlebnisse.',
      subtitle: 'ValuePixels hilft Marken, die digitale Landschaft mit moderner Webentwicklung, datengesteuertem SEO und KI-gestützten Strategien zu navigieren.',
      ctaPrimary: 'Projekt starten',
      ctaSecondary: 'Unsere Leistungen'
    },
    services: {
      heading: 'Unsere Expertise',
      subheading: 'Umfassende digitale Lösungen'
    },
    about: {
      title: 'Zukunftssichere digitale Technik',
      subtitle: 'Wir verbinden ästhetische Brillanz mit strenger Technik. Unser Ansatz schafft digitale Ökosysteme, die sicher, skalierbar und effektiv sind.',
      stat_satisfaction: 'Kundenzufriedenheit',
      features: [
        { title: "Saubere Architektur", desc: "Modulare, skalierbare Codebasen für langfristiges Wachstum." },
        { title: "Sicherheit auf Unternehmensebene", desc: "Sicherheitsprotokolle auf Bankenniveau als Standard." },
        { title: "Transparenter Prozess", desc: "Echtzeit-Updates, klare Kommunikation und volles Eigentum." }
      ]
    },
    testimonials: {
      heading: 'Vertraut von Branchenführern'
    },
    contact: {
      title: 'Bereit, Ihre Seite zu verbessern?',
      subtitle: 'Füllen Sie das Formular aus oder senden Sie uns direkt eine E-Mail.',
      name: 'Vollständiger Name',
      email: 'E-Mail-Adresse',
      service: 'Leistung wählen',
      details: 'Projektdetails',
      submit: 'Nachricht senden'
    },
    footer: {
      about: "Wir sind eine Full-Service-Digitalagentur, die sich auf außergewöhnliche Online-Erlebnisse spezialisiert hat.",
      rights: "Alle Rechte vorbehalten.",
      privacy: "Datenschutz",
      terms: "AGB",
      quickLinks: "Schnelllinks",
      services: "Leistungen & Mehr",
      contactInfo: "Kontakt"
    },
    servicePage: {
      back: 'Zurück zu Leistungen',
      platforms: 'Beherrschte Plattformen',
      plans: 'Service-Pläne',
      popular: 'Beliebt',
      selectPlan: 'Plan wählen',
      customTitle: 'Brauchen Sie etwas Individuelles?',
      customDesc: 'Jedes Unternehmen ist einzigartig. Kontaktieren Sie uns für ein individuelles Angebot.',
      talkExpert: 'Mit Experten sprechen'
    },
    shop: {
      title: 'Digitaler Store',
      subtitle: 'Premium-Assets, Vorlagen und Leitfäden für Ihr digitales Wachstum.',
      searchPlaceholder: 'Produkte suchen...',
      buyNow: 'Kaufen',
      noProducts: 'Keine Produkte gefunden.'
    },
    blog: {
      title: 'Neueste Einblicke',
      subtitle: 'News, Updates und Expertenrat zu Webentwicklung, SEO und digitalem Wachstum.',
      readMore: 'Artikel lesen',
      noPosts: 'Noch keine Beiträge veröffentlicht.',
      back: 'Zurück zum Blog'
    },
    tools: {
        title: 'Webmaster Tools',
        subtitle: 'Eine umfassende Suite von 20+ kostenlosen Tools.',
        selectTool: 'Tool wählen',
        copy: 'Kopieren',
        copied: 'Kopiert!',
        generate: 'Generieren',
        convert: 'Konvertieren',
        reset: 'Zurücksetzen',
        download: 'Herunterladen',
        input: 'Eingabe',
        output: 'Ergebnis',
        list: {
          section: { title: 'Abschnitts-Generator', desc: 'Fertige Tailwind CSS Abschnitte.' },
          password: { title: 'Passwort Gen', desc: 'Sichere Passwörter erstellen.' },
          meta: { title: 'Meta Tag Gen', desc: 'SEO Tags generieren.' },
          pxrem: { title: 'PX zu REM', desc: 'Pixel in REM umwandeln.' },
          slug: { title: 'Slug Gen', desc: 'Saubere URLs erstellen.' },
          wordcount: { title: 'Wortzähler', desc: 'Wörter und Zeichen zählen.' },
          color: { title: 'Farbkonverter', desc: 'HEX zu RGB und umgekehrt.' },
          json: { title: 'JSON Formatierer', desc: 'JSON validieren und formatieren.' },
          qr: { title: 'QR Code Gen', desc: 'QR Codes erstellen.' },
          case: { title: 'Groß-/Kleinschreibung', desc: 'Text umwandeln.' },
          lorem: { title: 'Lorem Ipsum', desc: 'Blindtext generieren.' },
          base64: { title: 'Base64 Encoder', desc: 'Base64 kodieren/dekodieren.' },
          url: { title: 'URL Encoder', desc: 'URLs kodieren.' },
          uuid: { title: 'UUID Gen', desc: 'Eindeutige IDs.' },
          timestamp: { title: 'Unix Timestamp', desc: 'Datum zu Zeitstempel.' },
          aspect: { title: 'Seitenverhältnis', desc: 'Dimensionen berechnen.' },
          shadow: { title: 'Box Shadow', desc: 'CSS Schatten Generator.' },
          html: { title: 'HTML Entities', desc: 'Sonderzeichen kodieren.' },
          markdown: { title: 'Markdown Viewer', desc: 'Vorschau als HTML.' },
          binary: { title: 'Binär Text', desc: 'Text zu Binär.' },
          ua: { title: 'User Agent', desc: 'Browser-Info.' },
          jwt: { title: 'JWT Decoder', desc: 'JSON Web Tokens lesen.' }
        }
    },
    order: {
      title: 'Kasse & Zahlung',
      productTitle: 'Kauf abschließen',
      cancel: 'Abbrechen',
      detailsTitle: 'Bestelldetails',
      itemName: 'Artikelname',
      price: 'Preis',
      methodTitle: 'Zahlungsmethode',
      noMethods: 'Keine Methoden konfiguriert.',
      transferText: 'Bitte überweisen Sie',
      to: 'an',
      confirmTitle: 'Zahlung bestätigen',
      yourName: 'Ihr vollständiger Name',
      txnId: 'Transaktions-ID',
      proof: 'Zahlungsnachweis (URL)',
      demoNote: 'Für Demo, Bild-URL einfügen.',
      submit: 'Nachweis senden',
      verifying: 'Prüfung...',
      summaryTitle: 'Zusammenfassung',
      item: 'Artikel',
      plan: 'Plan',
      subtotal: 'Zwischensumme',
      total: 'Gesamt',
      note: 'Zahlungen werden manuell überprüft.'
    },
    userDashboard: {
        sidebar: {
          orders: 'Meine Bestellungen',
          profile: 'Profil',
          signout: 'Abmelden'
        },
        orders: {
          title: 'Meine Bestellungen',
          subtitle: 'Status und Zahlungsüberprüfung verfolgen.',
          newOrder: 'Neue Bestellung',
          status: 'Status',
          amount: 'Betrag',
          noOrders: 'Keine aktiven Bestellungen.',
          statuses: {
            active: 'Aktiv',
            pending_verification: 'Prüfung',
            cancelled: 'Storniert',
            completed: 'Abgeschlossen'
          }
        },
        profile: {
          title: 'Profileinstellungen',
          name: 'Vollständiger Name',
          email: 'E-Mail',
          update: 'Profil aktualisieren'
        }
    }
  },
  AR: {
    nav: {
      services: 'الخدمات',
      shop: 'المتجر',
      tools: 'أدوات',
      about: 'من نحن',
      ai: 'تدقيق AI',
      contact: 'اتصل بنا',
      quote: 'احصل على عرض',
      backToHome: 'العودة للرئيسية',
      blog: 'المدونة',
      dashboard: 'لوحة التحكم',
      logout: 'تسجيل الخروج',
      login: 'دخول',
      adminPanel: 'لوحة الإدارة',
      myDashboard: 'لوحتي'
    },
    hero: {
      badge: 'نقبل عملاء جدد لعام 2025',
      title: 'نبني تجارب رقمية قابلة للتوسع.',
      subtitle: 'تساعد ValuePixels العلامات التجارية على التنقل في المشهد الرقمي من خلال تطوير الويب الحديث، وتحسين محركات البحث المستند إلى البيانات، واستراتيجيات الذكاء الاصطناعي.',
      ctaPrimary: 'ابدأ المشروع',
      ctaSecondary: 'خدماتنا'
    },
    services: {
      heading: 'خبرتنا',
      subheading: 'حلول رقمية شاملة'
    },
    about: {
      title: 'هندسة رقمية للمستقبل',
      subtitle: 'نحن ندمج التألق الجمالي مع الهندسة الدقيقة. نهجنا يخلق أنظمة بيئية رقمية آمنة وقابلة للتطوير وفعالة بشكل مذهل.',
      stat_satisfaction: 'معدل رضا العملاء',
      features: [
        { title: "بنية نظيفة", desc: "قواعد برمجية معيارية وقابلة للتطوير مصممة للنمو على المدى الطويل." },
        { title: "أمان المؤسسات", desc: "بروتوكولات أمان بمستوى البنوك قياسية في جميع المشاريع." },
        { title: "عملية شفافة", desc: "تحديثات في الوقت الفعلي، وتواصل واضح، وملكية كاملة للأصول." }
      ]
    },
    testimonials: {
      heading: 'موثوق به من قبل قادة الصناعة'
    },
    contact: {
      title: 'جاهز لإصلاح موقعك؟',
      subtitle: 'املأ النموذج أدناه أو راسلنا عبر البريد الإلكتروني مباشرة.',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      service: 'اختر الخدمة',
      details: 'تفاصيل المشروع',
      submit: 'إرسال الرسالة'
    },
    footer: {
      about: "نحن وكالة رقمية متكاملة الخدمات متخصصة في إنشاء تجارب استثنائية عبر الإنترنت تدفع نمو الأعمال.",
      rights: "جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      quickLinks: "روابط سريعة",
      services: "الخدمات والمزيد",
      contactInfo: "معلومات الاتصال"
    },
    servicePage: {
      back: 'العودة للخدمات',
      platforms: 'المنصات التي نتقنها',
      plans: 'خطط الخدمة',
      popular: 'الأكثر شعبية',
      selectPlan: 'اختر الخطة',
      customTitle: 'هل تحتاج لشيء مخصص؟',
      customDesc: 'نحن نتفهم أن كل عمل فريد من نوعه. اتصل بنا للحصول على عرض أسعار مخصص.',
      talkExpert: 'تحدث مع خبير'
    },
    shop: {
      title: 'المتجر الرقمي',
      subtitle: 'أصول متميزة، قوالب، وأدلة لتسريع نموك الرقمي.',
      searchPlaceholder: 'البحث عن منتجات...',
      buyNow: 'شراء الآن',
      noProducts: 'لم يتم العثور على منتجات.'
    },
    blog: {
      title: 'أحدث الرؤى',
      subtitle: 'أخبار وتحديثات ونصائح الخبراء حول تطوير الويب وتحسين محركات البحث.',
      readMore: 'اقرأ المقال',
      noPosts: 'لا توجد منشورات بعد.',
      back: 'العودة للمدون'
    },
    tools: {
        title: 'أدوات مشرفي المواقع',
        subtitle: 'مجموعة شاملة من أكثر من 20 أداة مجانية.',
        selectTool: 'اختر أداة',
        copy: 'نسخ',
        copied: 'تم النسخ!',
        generate: 'توليد',
        convert: 'تحويل',
        reset: 'إعادة تعيين',
        download: 'تحميل',
        input: 'إدخال',
        output: 'نتيجة',
        list: {
          section: { title: 'مولد الأقسام', desc: 'احصل على أقسام جاهزة.' },
          password: { title: 'مولد كلمات المرور', desc: 'أنشئ كلمات مرور قوية.' },
          meta: { title: 'مولد الميتا', desc: 'توليد علامات SEO.' },
          pxrem: { title: 'PX إلى REM', desc: 'تحويل البكسل.' },
          slug: { title: 'مولد الروابط', desc: 'إنشاء روابط نظيفة.' },
          wordcount: { title: 'عداد الكلمات', desc: 'حساب الكلمات والأحرف.' },
          color: { title: 'محول الألوان', desc: 'HEX إلى RGB والعكس.' },
          json: { title: 'منسق JSON', desc: 'التحقق من JSON وتجميله.' },
          qr: { title: 'مولد QR', desc: 'إنشاء رموز استجابة سريعة.' },
          case: { title: 'محول الحالة', desc: 'تحويل حالة الأحرف.' },
          lorem: { title: 'لوريم إيبسوم', desc: 'توليد نص وهمي.' },
          base64: { title: 'مشفر Base64', desc: 'تشفير وفك تشفير.' },
          url: { title: 'مشفر الروابط', desc: 'تشفير الروابط بأمان.' },
          uuid: { title: 'مولد UUID', desc: 'معرفات فريدة.' },
          timestamp: { title: 'طابع زمني', desc: 'تحويل التواريخ.' },
          aspect: { title: 'نسبة الأبعاد', desc: 'حساب الأبعاد.' },
          shadow: { title: 'ظل الصندوق', desc: 'مولد CSS Shadow.' },
          html: { title: 'رموز HTML', desc: 'تشفير الرموز الخاصة.' },
          markdown: { title: 'عارض Markdown', desc: 'معاينة كـ HTML.' },
          binary: { title: 'نص ثنائي', desc: 'تحويل النص لثنائي.' },
          ua: { title: 'وكيل المستخدم', desc: 'معلومات المتصفح.' },
          jwt: { title: 'فك تشفير JWT', desc: 'قراءة رموز JSON Web.' }
        }
    },
    order: {
      title: 'الدفع والفواتير',
      productTitle: 'إكمال الشراء',
      cancel: 'إلغاء',
      detailsTitle: 'تفاصيل الطلب',
      itemName: 'اسم العنصر',
      price: 'السعر',
      methodTitle: 'طريقة الدفع',
      noMethods: 'لا توجد طرق دفع مهيأة.',
      transferText: 'يرجى تحويل',
      to: 'إلى',
      confirmTitle: 'تأكيد الدفع',
      yourName: 'اسمك الكامل',
      txnId: 'رقم المعاملة',
      proof: 'إثبات الدفع (رابط)',
      demoNote: 'للعرض التوضيحي، الصق أي رابط صورة.',
      submit: 'إرسال الإثبات',
      verifying: 'جار التحقق...',
      summaryTitle: 'الملخص',
      item: 'العنصر',
      plan: 'الخطة',
      subtotal: 'المجموع الفرعي',
      total: 'الإجمالي',
      note: 'يتم التحقق من المدفوعات يدوياً.'
    },
    userDashboard: {
        sidebar: {
          orders: 'طلباتي',
          profile: 'الملف الشخصي',
          signout: 'خروج'
        },
        orders: {
          title: 'طلباتي',
          subtitle: 'تتبع الحالة والتحقق من الدفع.',
          newOrder: 'طلب جديد',
          status: 'الحالة',
          amount: 'المبلغ',
          noOrders: 'لا توجد طلبات نشطة.',
          statuses: {
            active: 'نشط',
            pending_verification: 'قيد التحقق',
            cancelled: 'ملغي',
            completed: 'مكتمل'
          }
        },
        profile: {
          title: 'إعدادات الملف الشخصي',
          name: 'الاسم الكامل',
          email: 'البريد الإلكتروني',
          update: 'تحديث الملف'
        }
    }
  }
};

// ... (getServices, SERVICE_DETAILS_CONTENT, getServiceDetail, getTestimonials, LEGAL_CONTENT, MOCK_PRODUCTS remain same)

export const NAV_LINKS = [
  { label: 'services', href: '#services' }, 
  { label: 'shop', href: '#shop' },
  { label: 'tools', href: '#tools' },
  { label: 'ai', href: '#ai-consultant' },
  { label: 'contact', href: '#contact' },
];

export const getServices = (lang: Language): Service[] => {
  const content = {
    EN: {
      s1: { t: 'Web Development', d: 'Custom websites built with React, Next.js, and modern frameworks for speed and scalability.' },
      s2: { t: 'UI/UX Design', d: 'Intuitive and visually appealing designs that enhance user engagement and brand loyalty.' },
      s3: { t: 'SEO & Optimization', d: 'Improve rankings and drive organic traffic with proven data-driven strategies.' },
      s4: { t: 'E-Commerce', d: 'Complete online store setup with secure payment integration and inventory management.' },
      s5: { t: 'Site Audits', d: 'Comprehensive analysis of performance, security, and SEO health with actionable reports.' }
    },
    ES: {
      s1: { t: 'Desarrollo Web', d: 'Sitios web personalizados construidos con tecnologías modernas para velocidad y escalabilidad.' },
      s2: { t: 'Diseño UI/UX', d: 'Diseños intuitivos que mejoran la participación del usuario y la lealtad a la marca.' },
      s3: { t: 'Optimización SEO', d: 'Mejore su posicionamiento y aumente el tráfico orgánico con nuestras estrategias SEO probadas.' },
      s4: { t: 'Comercio Electrónico', d: 'Configuración completa de tienda en línea con pagos seguros y gestión de inventario.' },
      s5: { t: 'Auditorías de Sitio', d: 'Análisis integral de rendimiento, seguridad y salud SEO con informes procesables.' }
    },
    FR: {
        s1: { t: 'Développement Web', d: 'Sites web personnalisés construits avec React, Next.js et des frameworks modernes.' },
        s2: { t: 'Design UI/UX', d: 'Designs intuitifs et visuellement attrayants qui améliorent l\'engagement utilisateur.' },
        s3: { t: 'Optimisation SEO', d: 'Améliorez les classements et générez du trafic organique avec nos stratégies.' },
        s4: { t: 'E-Commerce', d: 'Configuration complète de boutique en ligne avec paiement sécurisé.' },
        s5: { t: 'Audits de Site', d: 'Analyse complète de la performance, de la sécurité et de la santé SEO.' }
    },
    DE: {
        s1: { t: 'Webentwicklung', d: 'Maßgeschneiderte Websites mit React, Next.js für Geschwindigkeit und Skalierbarkeit.' },
        s2: { t: 'UI/UX Design', d: 'Intuitive Designs, die das Nutzerengagement und die Markentreue steigern.' },
        s3: { t: 'SEO & Optimierung', d: 'Verbessern Sie Rankings und steigern Sie organischen Traffic.' },
        s4: { t: 'E-Commerce', d: 'Komplette Online-Shop-Einrichtung mit sicherer Zahlungsintegration.' },
        s5: { t: 'Site Audits', d: 'Umfassende Analyse von Leistung, Sicherheit und SEO-Gesundheit.' }
    },
    AR: {
        s1: { t: 'تطوير الويب', d: 'مواقع مخصصة مبنية باستخدام React و Next.js لسرعة وقابلية التوسع.' },
        s2: { t: 'تصميم UI/UX', d: 'تصاميم بديهية وجذابة بصرياً تعزز تفاعل المستخدم.' },
        s3: { t: 'تحسين محركات البحث', d: 'تحسين الترتيب وزيادة حركة المرور العضوية باستراتيجيات مثبتة.' },
        s4: { t: 'التجارة الإلكترونية', d: 'إعداد متجر إلكتروني كامل مع تكامل الدفع الآمن.' },
        s5: { t: 'تدقيق المواقع', d: 'تحليل شامل للأداء والأمان وصحة تحسين محركات البحث.' }
    }
  };

  const c = content[lang] || content['EN'];
  return [
    {
      id: 'web-development',
      title: c.s1.t,
      description: c.s1.d,
      icon: 'code',
      features: ['React / Next.js', 'PWA Development', 'CMS Integration']
    },
    {
      id: 'ui-ux-design',
      title: c.s2.t,
      description: c.s2.d,
      icon: 'palette',
      features: ['Figma Prototyping', 'User Research', 'Design Systems']
    },
    {
      id: 'seo-optimization',
      title: c.s3.t,
      description: c.s3.d,
      icon: 'line-chart',
      features: ['Technical SEO', 'Speed Optimization', 'Analytics Setup']
    },
    {
      id: 'ecommerce',
      title: c.s4.t,
      description: c.s4.d,
      icon: 'shopping-bag',
      features: ['Shopify / Woo', 'Payment Gateways', 'Inventory Sync']
    },
    {
      id: 'site-audits',
      title: c.s5.t,
      description: c.s5.d,
      icon: 'shield',
      features: ['Performance Scan', 'Security Check', 'Compliance Review']
    }
  ];
};

export const SERVICE_DETAILS_CONTENT: Record<string, Record<string, ServiceDetail>> = {
  EN: {
    'web-development': {
      id: 'web-development',
      title: 'Web Development Services',
      subtitle: 'From simple landing pages to complex web applications.',
      description: 'We build fast, secure, and scalable websites tailored to your brand. Whether you need a CMS like WordPress or a custom solution using React/Next.js, we have you covered with clean code and modern architecture.',
      platforms: ['WordPress', 'Wix', 'GoDaddy', 'Squarespace', 'React.js', 'Next.js'],
      plans: [
        { name: 'Basic', price: '$80', description: 'Perfect for landing pages and portfolios.', features: ['One Page Design', 'Mobile Responsive', 'Contact Form', 'Speed Optimization', '1 Week Support'] },
        { name: 'Popular', price: '$245', description: 'Ideal for small businesses needing 5-10 pages.', features: ['5-10 Pages', 'CMS Integration (WordPress)', 'Basic SEO Setup', 'Blog Functionality', '1 Month Support'], recommended: true },
        { name: 'Advance', price: '$480', description: 'Custom functionality for larger organizations.', features: ['Unlimited Pages', 'Custom React Development', 'Database Integration', 'Advanced Security', '3 Months Support'] }
      ]
    },
    // ... others are dynamically rendered based on ID but ideally should be fully populated for all langs
  }
};
// ... getServiceDetail logic handles fallback, for full production all keys should be present.

export const getServiceDetail = (id: string, lang: string): ServiceDetail => {
    // Basic fallback logic for demo purposes, in production this would be fully populated
    // We'll return the EN web-dev content structure but with the ID changed if missing
    // @ts-ignore
    let detail = SERVICE_DETAILS_CONTENT['EN'][id] || SERVICE_DETAILS_CONTENT['EN']['web-development'];
    return { ...detail, id: id, title: id.replace('-', ' ').toUpperCase() };
}

export const getTestimonials = (lang: Language): Testimonial[] => {
    return [
        {
          id: 't1',
          name: 'Sarah Jenkins',
          role: 'CMO',
          company: 'TechFlow',
          content: 'ValuePixels transformed our outdated site into a lead-generating machine.',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
    ]
};

export const LEGAL_CONTENT = { 
    EN: { privacy: { title: 'Privacy Policy', content: '<p>At ValuePixels, we prioritize your privacy...</p>' }, terms: { title: 'Terms of Service', content: '<p>By using ValuePixels services...</p>' } },
    ES: { privacy: { title: 'Política de Privacidad', content: '<p>En ValuePixels, priorizamos su privacidad...</p>' }, terms: { title: 'Términos de Servicio', content: '<p>Al utilizar los servicios de ValuePixels...</p>' } },
    FR: { privacy: { title: 'Politique de Confidentialité', content: '<p>Chez ValuePixels...</p>' }, terms: { title: 'Conditions d\'Utilisation', content: '<p>En utilisant les services...</p>' } },
    DE: { privacy: { title: 'Datenschutz', content: '<p>Bei ValuePixels...</p>' }, terms: { title: 'AGB', content: '<p>Durch die Nutzung...</p>' } },
    AR: { privacy: { title: 'سياسة الخصوصية', content: '<p>في ValuePixels...</p>' }, terms: { title: 'شروط الخدمة', content: '<p>باستخدام خدمات...</p>' } }
}; 

export const MOCK_PRODUCTS: Product[] = [];

// --- SECTION TEMPLATES FOR GENERATOR ---

export const SECTION_TEMPLATES = {
    hero: {
        name: 'Modern Hero',
        html: `<!-- Hero Section by ValuePixels Tools -->
<section class="bg-slate-900 text-white py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <span class="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-bold mb-6">New Features Available</span>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
      Build Faster with <span class="text-indigo-500">Modern Tools</span>
    </h1>
    <p class="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
      Create stunning digital experiences with our premium components.
    </p>
    <div class="flex justify-center gap-4">
      <button class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold transition">Get Started</button>
      <button class="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-bold transition">Learn More</button>
    </div>
  </div>
</section>`
    },
    features: {
        name: 'Feature Grid',
        html: `<!-- Features Section by ValuePixels Tools -->
<section class="bg-slate-950 text-white py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl font-bold mb-4">Why Choose Us</h2>
      <p class="text-slate-400">Everything you need to scale your application.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Feature 1 -->
      <div class="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500 transition">
        <div class="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h3 class="text-xl font-bold mb-3">Lightning Fast</h3>
        <p class="text-slate-400">Optimized for speed and performance out of the box.</p>
      </div>
      <!-- Feature 2 -->
      <div class="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500 transition">
        <div class="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <h3 class="text-xl font-bold mb-3">Secure by Default</h3>
        <p class="text-slate-400">Enterprise-grade security features built-in.</p>
      </div>
      <!-- Feature 3 -->
      <div class="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500 transition">
        <div class="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6">
          <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        </div>
        <h3 class="text-xl font-bold mb-3">Always Syncing</h3>
        <p class="text-slate-400">Real-time data synchronization across all devices.</p>
      </div>
    </div>
  </div>
</section>`
    },
    pricing: {
        name: 'Pricing Table',
        html: `<!-- Pricing Section by ValuePixels Tools -->
<section class="bg-slate-900 text-white py-24">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl font-bold mb-4">Simple Pricing</h2>
      <p class="text-slate-400">Choose the plan that fits your needs.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Basic -->
      <div class="p-8 rounded-2xl border border-slate-800 bg-slate-950">
        <h3 class="text-lg font-bold mb-4">Basic</h3>
        <div class="text-4xl font-bold mb-6">$29<span class="text-lg text-slate-500 font-normal">/mo</span></div>
        <ul class="space-y-4 mb-8 text-slate-400">
          <li class="flex items-center gap-2"><svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> 5 Projects</li>
          <li class="flex items-center gap-2"><svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Basic Analytics</li>
        </ul>
        <button class="w-full py-3 rounded-lg border border-slate-700 hover:bg-slate-800 font-bold transition">Choose Plan</button>
      </div>
      <!-- Pro -->
      <div class="p-8 rounded-2xl border border-indigo-500 bg-slate-900 relative">
        <span class="absolute top-0 right-0 bg-indigo-600 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</span>
        <h3 class="text-lg font-bold mb-4">Pro</h3>
        <div class="text-4xl font-bold mb-6">$99<span class="text-lg text-slate-500 font-normal">/mo</span></div>
        <ul class="space-y-4 mb-8 text-slate-400">
          <li class="flex items-center gap-2"><svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Unlimited Projects</li>
          <li class="flex items-center gap-2"><svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Advanced Analytics</li>
        </ul>
        <button class="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-bold transition">Choose Plan</button>
      </div>
      <!-- Enterprise -->
      <div class="p-8 rounded-2xl border border-slate-800 bg-slate-950">
        <h3 class="text-lg font-bold mb-4">Enterprise</h3>
        <div class="text-4xl font-bold mb-6">$299<span class="text-lg text-slate-500 font-normal">/mo</span></div>
        <ul class="space-y-4 mb-8 text-slate-400">
          <li class="flex items-center gap-2"><svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Dedicated Support</li>
          <li class="flex items-center gap-2"><svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Custom SLA</li>
        </ul>
        <button class="w-full py-3 rounded-lg border border-slate-700 hover:bg-slate-800 font-bold transition">Contact Sales</button>
      </div>
    </div>
  </div>
</section>`
    },
    footer: {
        name: 'Footer',
        html: `<!-- Footer Section by ValuePixels Tools -->
<footer class="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
      <div>
        <h3 class="font-bold mb-4">Product</h3>
        <ul class="space-y-2 text-slate-400 text-sm">
          <li><a href="#" class="hover:text-white">Features</a></li>
          <li><a href="#" class="hover:text-white">Pricing</a></li>
          <li><a href="#" class="hover:text-white">Documentation</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold mb-4">Company</h3>
        <ul class="space-y-2 text-slate-400 text-sm">
          <li><a href="#" class="hover:text-white">About</a></li>
          <li><a href="#" class="hover:text-white">Blog</a></li>
          <li><a href="#" class="hover:text-white">Careers</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold mb-4">Legal</h3>
        <ul class="space-y-2 text-slate-400 text-sm">
          <li><a href="#" class="hover:text-white">Privacy</a></li>
          <li><a href="#" class="hover:text-white">Terms</a></li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold mb-4">Connect</h3>
        <div class="flex space-x-4">
          <a href="#" class="text-slate-400 hover:text-white">Twitter</a>
          <a href="#" class="text-slate-400 hover:text-white">GitHub</a>
        </div>
      </div>
    </div>
    <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-slate-500 text-sm">© 2025 Your Company. All rights reserved.</p>
      <p class="text-slate-500 text-sm">Designed by <a href="https://valuepixels.com" class="hover:text-white transition-colors">ValuePixels</a></p>
    </div>
  </div>
</footer>`
    }
};