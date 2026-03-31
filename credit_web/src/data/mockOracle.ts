export interface OracleEvent {
  id: string;
  timestamp: string;
  type: 'satellite' | 'sensor' | 'auditor';
  description: string;
  dataHash: string;
  status: 'INGESTED' | 'VERIFIED' | 'ARCHIVED' | 'PROOF GENERATED';
  project: string;
}

export const oracleEvents: OracleEvent[] = [
  { id: 'OE-001', timestamp: '2026-03-31 14:22:08', type: 'satellite', description: 'Multispectral scan ingested for Project Amazon Basin #77', dataHash: '0xA1b2C3d4E5f6A7B8c9D0e1F2a3B4c5D6', status: 'PROOF GENERATED', project: 'PROJ-077' },
  { id: 'OE-002', timestamp: '2026-03-31 14:21:45', type: 'sensor', description: 'Soil moisture telemetry batch uploaded — Tamil Nadu grid sector 4', dataHash: '0xB2c3D4e5F6a7B8C9d0E1f2A3b4C5d6E7', status: 'VERIFIED', project: 'PROJ-112' },
  { id: 'OE-003', timestamp: '2026-03-31 14:21:12', type: 'auditor', description: 'Third-party audit report submitted for Mekong Delta cover crop verification', dataHash: '0xC3d4E5f6A7b8C9D0e1F2a3B4c5D6e7F8', status: 'ARCHIVED', project: 'PROJ-089' },
  { id: 'OE-004', timestamp: '2026-03-31 14:20:33', type: 'satellite', description: 'NDVI index update for East African rotational grazing zones', dataHash: '0xD4e5F6a7B8c9D0E1f2A3b4C5d6E7f8A9', status: 'PROOF GENERATED', project: 'PROJ-156' },
  { id: 'OE-005', timestamp: '2026-03-31 14:19:55', type: 'sensor', description: 'Peat depth measurement array — Central Kalimantan, 38 sensors reporting', dataHash: '0xE5f6A7b8C9d0E1F2a3B4c5D6e7F8a9B0', status: 'INGESTED', project: 'PROJ-203' },
  { id: 'OE-006', timestamp: '2026-03-31 14:19:11', type: 'satellite', description: 'Canopy cover analysis complete for Congo Basin sector 12', dataHash: '0xF6a7B8c9D0e1F2A3b4C5d6E7f8A9b0C1', status: 'VERIFIED', project: 'PROJ-191' },
  { id: 'OE-007', timestamp: '2026-03-31 14:18:42', type: 'auditor', description: 'Smart contract parameter validation for ACFC-00128 settlement conditions', dataHash: '0xA7b8C9d0E1f2A3B4c5D6e7F8a9B0c1D2', status: 'PROOF GENERATED', project: 'PROJ-112' },
  { id: 'OE-008', timestamp: '2026-03-31 14:17:59', type: 'sensor', description: 'Carbon flux tower data aggregated — Amazon Basin hourly readings', dataHash: '0xB8c9D0e1F2a3B4C5d6E7f8A9b0C1d2E3', status: 'ARCHIVED', project: 'PROJ-077' },
  { id: 'OE-009', timestamp: '2026-03-31 14:17:14', type: 'satellite', description: 'Thermal anomaly detection scan — Borneo fire prevention network', dataHash: '0xC9d0E1f2A3b4C5D6e7F8a9B0c1D2e3F4', status: 'VERIFIED', project: 'PROJ-203' },
  { id: 'OE-010', timestamp: '2026-03-31 14:16:28', type: 'sensor', description: 'Groundwater level monitoring — Ethiopian Highland terracing project', dataHash: '0xD0e1F2a3B4c5D6E7f8A9b0C1d2E3f4A5', status: 'INGESTED', project: 'PROJ-298' },
  { id: 'OE-011', timestamp: '2026-03-31 14:15:44', type: 'auditor', description: 'Methodology compliance check: Zero-Tillage standard v2.1 for Maharashtra', dataHash: '0xE1f2A3b4C5d6E7F8a9B0c1D2e3F4a5B6', status: 'PROOF GENERATED', project: 'PROJ-067' },
  { id: 'OE-012', timestamp: '2026-03-31 14:14:57', type: 'satellite', description: 'High-resolution imagery captured for Java rice paddy health assessment', dataHash: '0xF2a3B4c5D6e7F8A9b0C1d2E3f4A5b6C7', status: 'INGESTED', project: 'PROJ-044' },
  { id: 'OE-013', timestamp: '2026-03-31 14:14:11', type: 'sensor', description: 'Wind speed and rainfall telemetry for Kerala micro-climate monitoring', dataHash: '0xA3b4C5d6E7f8A9B0c1D2e3F4a5B6c7D8', status: 'VERIFIED', project: 'PROJ-112' },
  { id: 'OE-014', timestamp: '2026-03-31 14:13:22', type: 'satellite', description: 'Land-use change detection — Cerrado savanna boundary verification', dataHash: '0xB4c5D6e7F8a9B0C1d2E3f4A5b6C7d8E9', status: 'ARCHIVED', project: 'PROJ-077' },
  { id: 'OE-015', timestamp: '2026-03-31 14:12:38', type: 'auditor', description: 'Cross-chain bridge verification for BNB ↔ Greenfield archival transaction', dataHash: '0xC5d6E7f8A9b0C1D2e3F4a5B6c7D8e9F0', status: 'PROOF GENERATED', project: 'PROJ-089' },
  { id: 'OE-016', timestamp: '2026-03-31 14:11:50', type: 'sensor', description: 'Biomass estimation from LiDAR drone sweep — Congo Basin grid 7', dataHash: '0xD6e7F8a9B0c1D2E3f4A5b6C7d8E9f0A1', status: 'VERIFIED', project: 'PROJ-191' },
  { id: 'OE-017', timestamp: '2026-03-31 14:11:02', type: 'satellite', description: 'Chlorophyll fluorescence index for Sundarbans mangrove monitoring', dataHash: '0xE7f8A9b0C1d2E3F4a5B6c7D8e9F0a1B2', status: 'INGESTED', project: 'PROJ-077' },
  { id: 'OE-018', timestamp: '2026-03-31 14:10:15', type: 'sensor', description: 'Soil organic carbon sampling results — Punjab stubble management zones', dataHash: '0xF8a9B0c1D2e3F4A5b6C7d8E9f0A1b2C3', status: 'ARCHIVED', project: 'PROJ-112' },
  { id: 'OE-020', timestamp: '2026-03-31 14:08:41', type: 'satellite', description: 'Seasonal NDVI comparison for Patagonia grassland monitoring', dataHash: '0xB0c1D2e3F4a5B6C7d8E9f0A1b2C3d4E5', status: 'VERIFIED', project: 'PROJ-156' },
  { id: 'OE-021', timestamp: '2026-03-31 14:07:55', type: 'sensor', description: 'Methane flux sensor calibration — Mekong Delta grid sector 2', dataHash: '0xC1d2E3f4A5b6C7D8e9F0a1B2c3D4e5F6', status: 'INGESTED', project: 'PROJ-089' },
  { id: 'OE-022', timestamp: '2026-03-31 14:07:08', type: 'auditor', description: 'Insurance treasury collateral ratio audit — quarterly compliance', dataHash: '0xD2e3F4a5B6c7D8E9f0A1b2C3d4E5f6A7', status: 'PROOF GENERATED', project: 'PROJ-077' },
  { id: 'OE-023', timestamp: '2026-03-31 14:06:21', type: 'satellite', description: 'Rainfall distribution mapping for East Java agricultural zones', dataHash: '0xE3f4A5b6C7d8E9F0a1B2c3D4e5F6a7B8', status: 'VERIFIED', project: 'PROJ-044' },
  { id: 'OE-024', timestamp: '2026-03-31 14:05:34', type: 'sensor', description: 'Temperature and humidity array — Amazon Basin canopy layer sensors', dataHash: '0xF4a5B6c7D8e9F0A1b2C3d4E5f6A7b8C9', status: 'ARCHIVED', project: 'PROJ-077' },
  { id: 'OE-025', timestamp: '2026-03-31 14:04:47', type: 'satellite', description: 'Coastline erosion monitoring for Myanmar mangrove boundaries', dataHash: '0xA5b6C7d8E9f0A1B2c3D4e5F6a7B8c9D0', status: 'INGESTED', project: 'PROJ-077' },
  { id: 'OE-026', timestamp: '2026-03-31 14:04:00', type: 'sensor', description: 'Soil NPK nutrient analysis batch — Tamil Nadu zero-tillage plots', dataHash: '0xB6c7D8e9F0a1B2C3d4E5f6A7b8C9d0E1', status: 'VERIFIED', project: 'PROJ-112' },
  { id: 'OE-027', timestamp: '2026-03-31 14:03:13', type: 'auditor', description: 'VCC batch minting authorization — 340 tons Rift Valley credits', dataHash: '0xC7d8E9f0A1b2C3D4e5F6a7B8c9D0e1F2', status: 'PROOF GENERATED', project: 'PROJ-156' },
  { id: 'OE-028', timestamp: '2026-03-31 14:02:26', type: 'satellite', description: 'Cloud-free composite generation for Ethiopian Highland spectral analysis', dataHash: '0xD8e9F0a1B2c3D4E5f6A7b8C9d0E1f2A3', status: 'ARCHIVED', project: 'PROJ-298' },
  { id: 'OE-029', timestamp: '2026-03-31 14:01:39', type: 'sensor', description: 'Water table depth readings — Borneo peat rewetting monitoring', dataHash: '0xE9f0A1b2C3d4E5F6a7B8c9D0e1F2a3B4', status: 'INGESTED', project: 'PROJ-203' },
  { id: 'OE-030', timestamp: '2026-03-31 14:00:52', type: 'auditor', description: 'Annual methodology review submission — Cover Cropping standard v3.0', dataHash: '0xF0a1B2c3D4e5F6A7b8C9d0E1f2A3b4C5', status: 'VERIFIED', project: 'PROJ-089' },
];
