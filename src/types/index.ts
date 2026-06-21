export interface Subscriber {
  id: string
  startup_name: string
  founder_name: string
  email: string
  phone?: string
  incubator_name?: string
  website?: string
  access_code: string
  verified: boolean
  created_at: string
}

export interface Article {
  id: string
  title: string
  summary?: string
  url: string
  source?: string
  category: 'startups' | 'grants'
  published_at?: string
}

export interface RegisterFormData {
  startup_name: string
  founder_name: string
  email: string
  phone: string
  incubator_name: string
  website: string
}