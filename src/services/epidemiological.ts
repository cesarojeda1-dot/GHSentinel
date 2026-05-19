import axios from 'axios';
import { EpidemiologicalData, ContinentalMetrics, DiseaseAlert } from '../types';

/**
 * EpidemiologicalRadarService
 * Manages real-time disease surveillance and continental monitoring
 */
export class EpidemiologicalRadarService {
  private apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  private wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

  /**
   * Get real-time continental epidemiological data
   */
  async getContinentalData(): Promise<ContinentalMetrics> {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/epidemiological/continental`);
      return response.data;
    } catch (error) {
      console.error('Error fetching continental data:', error);
      throw error;
    }
  }

  /**
   * Get regional epidemiological metrics by country
   */
  async getRegionalMetrics(country: string): Promise<EpidemiologicalData[]> {
    try {
      const response = await axios.get(
        `${this.apiBaseUrl}/epidemiological/regional/${country}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching regional data for ${country}:`, error);
      throw error;
    }
  }

  /**
   * Get heat map data for visualization
   */
  async getHeatMapData(region?: string) {
    try {
      const url = region
        ? `${this.apiBaseUrl}/epidemiological/heatmap/${region}`
        : `${this.apiBaseUrl}/epidemiological/heatmap`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching heat map data:', error);
      throw error;
    }
  }

  /**
   * Get active disease alerts
   */
  async getDiseaseAlerts(severity?: 'critical' | 'high' | 'medium' | 'low'): Promise<DiseaseAlert[]> {
    try {
      const params = severity ? { severity } : {};
      const response = await axios.get(
        `${this.apiBaseUrl}/epidemiological/alerts`,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching disease alerts:', error);
      throw error;
    }
  }

  /**
   * Report disease outbreak
   */
  async reportOutbreak(
    data: {
      diseaseCode: string;
      location: { lat: number; lng: number };
      severity: string;
      casesCount: number;
      description: string;
      reportedBy: string;
    }
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.apiBaseUrl}/epidemiological/outbreaks/report`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Error reporting outbreak:', error);
      throw error;
    }
  }

  /**
   * Get predictive outbreak forecast
   */
  async getOutbreakForecast(region: string, daysAhead: number = 14): Promise<any> {
    try {
      const response = await axios.get(
        `${this.apiBaseUrl}/epidemiological/forecast`,
        { params: { region, daysAhead } }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching outbreak forecast:', error);
      throw error;
    }
  }
}

export const epidemiologicalService = new EpidemiologicalRadarService();
