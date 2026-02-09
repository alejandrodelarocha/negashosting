import { useReducer } from 'react'

export const initialState = {
  logo: null,
  title: '',
  subtitle: '',
  customCss: '',
  projectId: '',
  projectName: '',
  hero: { align: 'center', bgColor: '', textColor: '', fontSize: '', fontWeight: '', fontStyle: '', fullHeight: false, fullWidth: false, image: null, imageLayout: 'background', animation: 'none', buttons: [] },
  navStyle: { bgColor: '', textColor: '', align: 'center', position: 'sticky', fontSize: '' },
  nav: [],
  sections: [
    { id: crypto.randomUUID(), title: '', content: '', align: 'left', bgColor: '', textColor: '', fontSize: '', fontWeight: '', fontStyle: '', image: null, imageLayout: 'none', fullWidth: false, fullHeight: false, animation: 'none', buttons: [] }
  ],
  contact: {
    phone: '',
    email: '',
    address: '',
    social: {
      facebook: '',
      instagram: '',
      whatsapp: '',
    }
  },
  whatsapp: { enabled: false, phone: '', message: '' },
  typography: { headingFont: 'Outfit', bodyFont: 'Outfit' },
  faq: { enabled: false, title: 'Preguntas Frecuentes', items: [] },
  contactForm: {
    enabled: false,
    fields: [
      { id: crypto.randomUUID(), type: 'text', label: 'Nombre', required: true },
      { id: crypto.randomUUID(), type: 'email', label: 'Email', required: true },
      { id: crypto.randomUUID(), type: 'textarea', label: 'Mensaje', required: false },
    ],
    submitText: 'Enviar',
    submitAction: 'mailto',
    submitEmail: '',
    submitWhatsApp: ''
  }
}

export function builderReducer(state, action) {
  switch (action.type) {
    case 'SET_LOGO':
      return { ...state, logo: action.payload }
    case 'CLEAR_LOGO':
      return { ...state, logo: null }
    case 'SET_CSS':
      return { ...state, customCss: action.payload }
    case 'SET_PROJECT_NAME':
      return { ...state, projectName: action.payload }
    case 'SET_PROJECT_ID':
      return { ...state, projectId: action.payload }
    case 'SET_HERO':
      return { ...state, hero: { ...state.hero, [action.payload.field]: action.payload.value } }

    // Hero buttons
    case 'ADD_HERO_BUTTON':
      return { ...state, hero: { ...state.hero, buttons: [...(state.hero.buttons || []), { id: crypto.randomUUID(), text: '', url: '#', style: 'primary' }] } }
    case 'REMOVE_HERO_BUTTON':
      return { ...state, hero: { ...state.hero, buttons: (state.hero.buttons || []).filter(b => b.id !== action.payload) } }
    case 'UPDATE_HERO_BUTTON':
      return { ...state, hero: { ...state.hero, buttons: (state.hero.buttons || []).map(b => b.id === action.payload.id ? { ...b, [action.payload.field]: action.payload.value } : b) } }

    // Nav style
    case 'SET_NAV_STYLE':
      return { ...state, navStyle: { ...state.navStyle, [action.payload.field]: action.payload.value } }

    // Nav
    case 'ADD_NAV_ITEM':
      return { ...state, nav: [...state.nav, { id: crypto.randomUUID(), label: '', target: 'hero' }] }
    case 'REMOVE_NAV_ITEM':
      return { ...state, nav: state.nav.filter(n => n.id !== action.payload) }
    case 'UPDATE_NAV_ITEM':
      return { ...state, nav: state.nav.map(n => n.id === action.payload.id ? { ...n, [action.payload.field]: action.payload.value } : n) }
    case 'MOVE_NAV_ITEM': {
      const { fromIndex, toIndex } = action.payload
      const nav = [...state.nav]
      const [moved] = nav.splice(fromIndex, 1)
      nav.splice(toIndex, 0, moved)
      return { ...state, nav }
    }

    // Title/subtitle
    case 'SET_TITLE':
      return { ...state, title: action.payload }
    case 'SET_SUBTITLE':
      return { ...state, subtitle: action.payload }

    // Sections
    case 'ADD_SECTION':
      return { ...state, sections: [...state.sections, { id: crypto.randomUUID(), title: '', content: '', align: 'left', bgColor: '', textColor: '', fontSize: '', fontWeight: '', fontStyle: '', image: null, imageLayout: 'none', fullWidth: false, fullHeight: false, animation: 'none', buttons: [] }] }
    case 'REMOVE_SECTION':
      return { ...state, sections: state.sections.filter(s => s.id !== action.payload) }
    case 'UPDATE_SECTION':
      return {
        ...state,
        sections: state.sections.map(s =>
          s.id === action.payload.id ? { ...s, [action.payload.field]: action.payload.value } : s
        )
      }
    case 'MOVE_SECTION': {
      const { fromIndex, toIndex } = action.payload
      const sections = [...state.sections]
      const [moved] = sections.splice(fromIndex, 1)
      sections.splice(toIndex, 0, moved)
      return { ...state, sections }
    }

    // Section buttons
    case 'ADD_SECTION_BUTTON':
      return {
        ...state,
        sections: state.sections.map(s =>
          s.id === action.payload ? { ...s, buttons: [...(s.buttons || []), { id: crypto.randomUUID(), text: '', url: '#', style: 'primary' }] } : s
        )
      }
    case 'REMOVE_SECTION_BUTTON':
      return {
        ...state,
        sections: state.sections.map(s =>
          s.id === action.payload.sectionId ? { ...s, buttons: (s.buttons || []).filter(b => b.id !== action.payload.buttonId) } : s
        )
      }
    case 'UPDATE_SECTION_BUTTON':
      return {
        ...state,
        sections: state.sections.map(s =>
          s.id === action.payload.sectionId ? { ...s, buttons: (s.buttons || []).map(b => b.id === action.payload.buttonId ? { ...b, [action.payload.field]: action.payload.value } : b) } : s
        )
      }

    // Contact
    case 'SET_CONTACT':
      return { ...state, contact: { ...state.contact, [action.payload.field]: action.payload.value } }
    case 'SET_SOCIAL':
      return {
        ...state,
        contact: {
          ...state.contact,
          social: { ...state.contact.social, [action.payload.field]: action.payload.value }
        }
      }

    // WhatsApp
    case 'SET_WHATSAPP':
      return { ...state, whatsapp: { ...state.whatsapp, [action.payload.field]: action.payload.value } }

    // Typography
    case 'SET_TYPOGRAPHY':
      return { ...state, typography: { ...state.typography, [action.payload.field]: action.payload.value } }

    // FAQ
    case 'SET_FAQ':
      return { ...state, faq: { ...state.faq, [action.payload.field]: action.payload.value } }
    case 'ADD_FAQ_ITEM':
      return { ...state, faq: { ...state.faq, items: [...state.faq.items, { id: crypto.randomUUID(), question: '', answer: '' }] } }
    case 'REMOVE_FAQ_ITEM':
      return { ...state, faq: { ...state.faq, items: state.faq.items.filter(i => i.id !== action.payload) } }
    case 'UPDATE_FAQ_ITEM':
      return { ...state, faq: { ...state.faq, items: state.faq.items.map(i => i.id === action.payload.id ? { ...i, [action.payload.field]: action.payload.value } : i) } }
    case 'MOVE_FAQ_ITEM': {
      const { fromIndex, toIndex } = action.payload
      const items = [...state.faq.items]
      const [moved] = items.splice(fromIndex, 1)
      items.splice(toIndex, 0, moved)
      return { ...state, faq: { ...state.faq, items } }
    }

    // Contact Form
    case 'SET_CONTACT_FORM':
      return { ...state, contactForm: { ...state.contactForm, [action.payload.field]: action.payload.value } }
    case 'ADD_FORM_FIELD':
      return { ...state, contactForm: { ...state.contactForm, fields: [...state.contactForm.fields, { id: crypto.randomUUID(), type: 'text', label: '', required: false }] } }
    case 'REMOVE_FORM_FIELD':
      return { ...state, contactForm: { ...state.contactForm, fields: state.contactForm.fields.filter(f => f.id !== action.payload) } }
    case 'UPDATE_FORM_FIELD':
      return { ...state, contactForm: { ...state.contactForm, fields: state.contactForm.fields.map(f => f.id === action.payload.id ? { ...f, [action.payload.field]: action.payload.value } : f) } }
    case 'MOVE_FORM_FIELD': {
      const { fromIndex, toIndex } = action.payload
      const fields = [...state.contactForm.fields]
      const [moved] = fields.splice(fromIndex, 1)
      fields.splice(toIndex, 0, moved)
      return { ...state, contactForm: { ...state.contactForm, fields } }
    }

    // Load full state (from saved project)
    case 'LOAD_STATE':
      return { ...initialState, ...action.payload }

    // AI state
    case 'LOAD_AI_STATE': {
      const ai = action.payload
      const sectionIds = (ai.sections || []).map(() => ({
        id: crypto.randomUUID(),
      }))
      const mappedSections = (ai.sections || []).map((s, i) => ({
        id: sectionIds[i].id,
        title: s.title || '',
        content: s.content || '',
        align: s.align || 'left',
        bgColor: s.bgColor || '',
        textColor: s.textColor || '',
        fontSize: s.fontSize || '',
        fontWeight: s.fontWeight || '',
        fontStyle: s.fontStyle || '',
        image: null,
        imageLayout: 'none',
        fullWidth: s.fullWidth || false,
        fullHeight: s.fullHeight || false,
        animation: s.animation || 'none',
        buttons: []
      }))
      const navItems = (ai.nav || []).map(n => {
        let target = n.target
        if (target && target.startsWith('section-')) {
          const idx = parseInt(target.replace('section-', ''), 10) - 1
          if (sectionIds[idx]) target = sectionIds[idx].id
        }
        return { id: crypto.randomUUID(), label: n.label || '', target: target || 'hero', url: n.url || '' }
      })
      return {
        ...state,
        title: ai.title || state.title,
        subtitle: ai.subtitle || state.subtitle,
        customCss: ai.css || state.customCss,
        hero: { ...state.hero, ...(ai.hero || {}), image: state.hero.image, buttons: state.hero.buttons || [] },
        nav: navItems,
        sections: mappedSections.length ? mappedSections : state.sections,
        contact: {
          phone: ai.contact?.phone || state.contact.phone,
          email: ai.contact?.email || state.contact.email,
          address: ai.contact?.address || state.contact.address,
          social: { ...state.contact.social, ...(ai.contact?.social || {}) }
        }
      }
    }
    default:
      return state
  }
}

export default function useBuilderState() {
  return useReducer(builderReducer, initialState)
}
