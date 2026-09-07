export interface OfficialAlert {
  id: string;
  hazard: string;
  severity: 'Low' | 'Moderate' | 'High' | 'Extreme';
  affected_location: string;
  issued_at: string;
  valid_from: string;
  valid_until: string;
  source: string;
  description: string;
}
