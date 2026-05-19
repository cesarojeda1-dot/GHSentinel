/**
 * Type definitions for GHSentinel
 */

// Epidemiological Data Types
export interface EpidemiologicalData {
  id: string;
  diseaseCode: string;
  diseaseName: string;
  country: string;
  region: string;
  location: {
    lat: number;
    lng: number;
  };
  casesCount: number;
  confirmedCases: number;
  deathCount: number;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  riskScore: number;
}

export interface ContinentalMetrics {
  totalCases: number;
  totalDeaths: number;
  affectedCountries: number;
  activeAlerts: number;
  averageRiskScore: number;
  lastUpdated: string;
  topDiseases: DiseaseMetric[];
  countryMetrics: CountryMetric[];
}

export interface DiseaseMetric {
  code: string;
  name: string;
  cases: number;
  deaths: number;
  trendDirection: 'up' | 'down' | 'stable';
}

export interface CountryMetric {
  code: string;
  name: string;
  cases: number;
  deaths: number;
  riskLevel: string;
}

export interface DiseaseAlert {
  id: string;
  diseaseCode: string;
  location: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  affectedAreas: string[];
  recommendations: string[];
  timestamp: string;
  expiresAt: string;
}

// Government Types
export interface GovernmentCompliance {
  organizationId: string;
  overallScore: number;
  status: 'compliant' | 'non-compliant' | 'pending' | 'in-progress';
  items: ComplianceItem[];
  lastAuditDate: string;
  nextAuditDate: string;
}

export interface ComplianceItem {
  id: string;
  category: string;
  requirement: string;
  status: 'compliant' | 'non-compliant' | 'pending';
  dueDate: string;
  notes?: string;
}

export interface HealthAuthority {
  name: string;
  code: string;
  country: string;
  website: string;
  email: string;
}

export interface Certification {
  id: string;
  type: string;
  number: string;
  issueDate: string;
  expiryDate: string;
  issuer: string;
  status: 'active' | 'expired' | 'pending';
}

// Contact Types
export interface VeterinaryClinic {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  website?: string;
  registrationNumber: string;
  specialties: string[];
  services: string[];
  rating: number;
  reviewCount: number;
  licenses: Certification[];
  verified: boolean;
}

export interface PetShop {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  website?: string;
  registrationNumber: string;
  productCategories: string[];
  rating: number;
  reviewCount: number;
  verified: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  country: string;
  contactPerson: string;
  email: string;
  phone: string;
  website?: string;
  category: string;
  productLines: string[];
  rating: number;
  certifications: Certification[];
  minimumOrderQuantity?: number;
  verified: boolean;
}

export interface ServiceRequest {
  type: string;
  description: string;
  date?: string;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  notes?: string;
}

export interface ContactDirectory {
  veterinaryClinics: VeterinaryClinic[];
  petShops: PetShop[];
  suppliers: Supplier[];
}

// Revenue & B2B2C Types
export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  maxApiCalls: number;
  maxUsers: number;
}

export interface Commission {
  id: string;
  partnerId: string;
  type: string;
  amount: number;
  currency: string;
  transactionId: string;
  date: string;
  status: 'pending' | 'approved' | 'paid';
}

export interface Transaction {
  id: string;
  organizationId: string;
  amount: number;
  currency: string;
  type: 'subscription' | 'marketplace' | 'api_access' | 'premium';
  description: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  timestamp: string;
  paymentMethod?: string;
}
