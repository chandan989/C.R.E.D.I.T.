export interface VCCListing {
  id: string;
  projectName: string;
  region: string;
  methodology: string;
  tons: number;
  pricePerTon: number;
  status: 'on-sale' | 'sold' | 'retired';
  contractHash: string;
  vintage: number;
  totalArea: string;
  co2PerHectare: number;
  greenfieldLink: string;
  description: string;
  verificationTier: number;
  totalTiers: number;
}

export const vccListings: VCCListing[] = [
  { id: 'VCC-00347', projectName: 'Amazon Basin Restoration Zone', region: 'Amazon Basin, Brazil', methodology: 'Agroforestry', tons: 120, pricePerTon: 14.80, status: 'on-sale', contractHash: '0x71C7a034B91f24E13c8d8b7D59C4Fe2b44e38f2e44', vintage: 2025, totalArea: '2,400 ha', co2PerHectare: 5.95, greenfieldLink: 'gf://credit-archive/vcc-00347', description: 'Verified carbon credits from large-scale agroforestry in the Brazilian Amazon.', verificationTier: 5, totalTiers: 5 },
  { id: 'VCC-00348', projectName: 'Tamil Nadu Zero-Tillage Initiative', region: 'Tamil Nadu, India', methodology: 'Zero-Tillage', tons: 85, pricePerTon: 15.20, status: 'on-sale', contractHash: '0xA3f2c71B849E6D40Cc17B3901a8F4e2D5710eBc9', vintage: 2025, totalArea: '1,800 ha', co2PerHectare: 5.47, greenfieldLink: 'gf://credit-archive/vcc-00348', description: 'Soil carbon credits from zero-tillage practices across Tamil Nadu.', verificationTier: 4, totalTiers: 5 },
  { id: 'VCC-00349', projectName: 'Mekong Delta Cover Cropping', region: 'Mekong Delta, Vietnam', methodology: 'Cover Cropping', tons: 200, pricePerTon: 13.90, status: 'on-sale', contractHash: '0xD8e4F917a2B30c65E1Dd94A3fC82b7190EFa6c3d', vintage: 2025, totalArea: '3,200 ha', co2PerHectare: 5.76, greenfieldLink: 'gf://credit-archive/vcc-00349', description: 'Rice paddy emission reduction through cover cropping.', verificationTier: 5, totalTiers: 5 },
  { id: 'VCC-00350', projectName: 'East African Rotational Grazing', region: 'Rift Valley, Kenya', methodology: 'Rotational Grazing', tons: 340, pricePerTon: 12.40, status: 'on-sale', contractHash: '0x5Bb921eC3A7fD48Fe0917c2E63B8dA4501cFe7a2', vintage: 2024, totalArea: '5,600 ha', co2PerHectare: 3.95, greenfieldLink: 'gf://credit-archive/vcc-00350', description: 'Grassland restoration through managed grazing.', verificationTier: 5, totalTiers: 5 },
  { id: 'VCC-00351', projectName: 'Borneo Peatland Restoration', region: 'Central Kalimantan, Indonesia', methodology: 'Agroforestry', tons: 480, pricePerTon: 16.50, status: 'on-sale', contractHash: '0x92Fa7dE3b401C58a6B7D90eF12d4A8cC3e5Fb0a1', vintage: 2025, totalArea: '4,100 ha', co2PerHectare: 7.61, greenfieldLink: 'gf://credit-archive/vcc-00351', description: 'Peatland rewetting and agroforestry for high-impact carbon capture.', verificationTier: 3, totalTiers: 5 },
  { id: 'VCC-00352', projectName: 'Maharashtra Soil Carbon Programme', region: 'Maharashtra, India', methodology: 'Zero-Tillage', tons: 65, pricePerTon: 14.10, status: 'sold', contractHash: '0xCc4E81fAd3720B9e55A41dC87F6E2a3b90D14c88', vintage: 2024, totalArea: '1,200 ha', co2PerHectare: 5.45, greenfieldLink: 'gf://credit-archive/vcc-00352', description: 'Smallholder cooperative carbon credits.', verificationTier: 4, totalTiers: 5 },
  { id: 'VCC-00353', projectName: 'Congo Basin Reforestation', region: 'Eastern Congo, DRC', methodology: 'Agroforestry', tons: 560, pricePerTon: 11.80, status: 'on-sale', contractHash: '0xE1a9F42cD587B0e36A9d72C4180Ef5Ba8d2903c7', vintage: 2025, totalArea: '7,800 ha', co2PerHectare: 5.41, greenfieldLink: 'gf://credit-archive/vcc-00353', description: 'Community-led reforestation carbon credits.', verificationTier: 2, totalTiers: 5 },
  { id: 'VCC-00354', projectName: 'Java Sustainable Rice Programme', region: 'East Java, Indonesia', methodology: 'Cover Cropping', tons: 45, pricePerTon: 15.90, status: 'on-sale', contractHash: '0x7Fd3B8e1aC94506dE2fA7b901C38D45e6710aFc2', vintage: 2024, totalArea: '900 ha', co2PerHectare: 5.36, greenfieldLink: 'gf://credit-archive/vcc-00354', description: 'Sustainable rice AWD plus cover cropping credits.', verificationTier: 5, totalTiers: 5 },
  { id: 'VCC-00355', projectName: 'Ethiopian Highland Terracing', region: 'Amhara, Ethiopia', methodology: 'Rotational Grazing', tons: 150, pricePerTon: 13.20, status: 'on-sale', contractHash: '0xB4d6A720Ef38c91D5e7F0bC42a839Ed10F6c5Ba3', vintage: 2025, totalArea: '2,100 ha', co2PerHectare: 4.16, greenfieldLink: 'gf://credit-archive/vcc-00355', description: 'Highland terracing and rotational grazing credits.', verificationTier: 3, totalTiers: 5 },
  { id: 'VCC-00356', projectName: 'Kerala Spice Agroforestry', region: 'Kerala, India', methodology: 'Agroforestry', tons: 72, pricePerTon: 17.40, status: 'on-sale', contractHash: '0xF1b2C3d4E5f6A7B8c9D0e1F2a3B4c5D6e7F8a9B0', vintage: 2025, totalArea: '600 ha', co2PerHectare: 6.12, greenfieldLink: 'gf://credit-archive/vcc-00356', description: 'Shade-grown spice agroforestry credits.', verificationTier: 4, totalTiers: 5 },
  { id: 'VCC-00357', projectName: 'Cerrado Savanna Restoration', region: 'Goiás, Brazil', methodology: 'Agroforestry', tons: 290, pricePerTon: 14.50, status: 'retired', contractHash: '0xA1B2c3D4e5F6a7B8C9d0E1f2A3b4C5d6E7f8A9b0', vintage: 2024, totalArea: '3,400 ha', co2PerHectare: 4.88, greenfieldLink: 'gf://credit-archive/vcc-00357', description: 'Native cerrado restoration credits.', verificationTier: 5, totalTiers: 5 },
  { id: 'VCC-00358', projectName: 'Myanmar Mangrove Sequestration', region: 'Ayeyarwady, Myanmar', methodology: 'Agroforestry', tons: 180, pricePerTon: 18.20, status: 'on-sale', contractHash: '0xC2D3e4F5a6B7c8D9e0F1a2B3c4D5e6F7a8B9c0D1', vintage: 2025, totalArea: '1,100 ha', co2PerHectare: 8.42, greenfieldLink: 'gf://credit-archive/vcc-00358', description: 'Mangrove restoration and blue carbon credits.', verificationTier: 3, totalTiers: 5 },
  { id: 'VCC-00359', projectName: 'Punjab Stubble Management', region: 'Punjab, India', methodology: 'Zero-Tillage', tons: 95, pricePerTon: 13.60, status: 'sold', contractHash: '0xD3E4f5A6b7C8d9E0f1A2b3C4d5E6f7A8b9C0d1E2', vintage: 2024, totalArea: '2,200 ha', co2PerHectare: 4.32, greenfieldLink: 'gf://credit-archive/vcc-00359', description: 'Stubble-burning elimination and zero-till credits.', verificationTier: 4, totalTiers: 5 },
  { id: 'VCC-00360', projectName: 'Patagonia Grassland Reserve', region: 'Patagonia, Argentina', methodology: 'Rotational Grazing', tons: 410, pricePerTon: 12.90, status: 'on-sale', contractHash: '0xE4F5a6B7c8D9e0F1a2B3c4D5e6F7a8B9c0D1e2F3', vintage: 2025, totalArea: '8,200 ha', co2PerHectare: 3.28, greenfieldLink: 'gf://credit-archive/vcc-00360', description: 'Southern grassland conservation credits.', verificationTier: 4, totalTiers: 5 },
  { id: 'VCC-00361', projectName: 'Sundarbans Blue Carbon', region: 'West Bengal, India', methodology: 'Agroforestry', tons: 220, pricePerTon: 19.80, status: 'on-sale', contractHash: '0xF5A6b7C8d9E0f1A2b3C4d5E6f7A8b9C0d1E2f3A4', vintage: 2025, totalArea: '1,500 ha', co2PerHectare: 9.14, greenfieldLink: 'gf://credit-archive/vcc-00361', description: 'Sundarbans mangrove blue carbon credits.', verificationTier: 3, totalTiers: 5 },
];

export interface ACFCListing {
  id: string;
  farmerId: string;
  commodity: string;
  region: string;
  expectedYield: string;
  yieldTons: number;
  discount: number;
  settlementDate: string;
  oracleConfidence: number;
  investmentAmount: number;
  riskTier: 'Low' | 'Medium' | 'High';
  contractHash: string;
  status: 'active' | 'settled' | 'pending';
  insuranceCovered: boolean;
  historicalYields: number[];
  description: string;
}

export const acfcListings: ACFCListing[] = [
  { id: 'ACFC-00128', farmerId: 'FARMER_TN_0042', commodity: 'Basmati Rice', region: 'Tamil Nadu, India', expectedYield: '10 TONS', yieldTons: 10, discount: 15, settlementDate: 'NOV 2026', oracleConfidence: 94.2, investmentAmount: 12400, riskTier: 'Low', contractHash: '0xAB12cd34EF56ab78CD90ef12AB34cd56EF78ab90', status: 'active', insuranceCovered: true, historicalYields: [9.2, 10.1, 8.8, 11.2, 9.7, 10.4], description: 'Forward contract for premium basmati rice from irrigated paddy fields in Tamil Nadu.' },
  { id: 'ACFC-00129', farmerId: 'FARMER_KL_0018', commodity: 'Coffee', region: 'Kerala, India', expectedYield: '3.5 TONS', yieldTons: 3.5, discount: 20, settlementDate: 'FEB 2027', oracleConfidence: 88.7, investmentAmount: 8900, riskTier: 'Medium', contractHash: '0xBC23de45FA67bc89DE01fa23BC45de67FA89bc01', status: 'active', insuranceCovered: true, historicalYields: [3.1, 3.8, 2.9, 3.4, 3.6, 3.2], description: 'Arabica coffee forward contract from shade-grown plantations in the Western Ghats.' },
  { id: 'ACFC-00130', farmerId: 'FARMER_MD_0091', commodity: 'Rice', region: 'Mekong Delta, Vietnam', expectedYield: '25 TONS', yieldTons: 25, discount: 12, settlementDate: 'SEP 2026', oracleConfidence: 96.1, investmentAmount: 28600, riskTier: 'Low', contractHash: '0xCD34ef56AB78cd90EF12ab34CD56ef78AB90cd12', status: 'active', insuranceCovered: true, historicalYields: [24.2, 26.1, 23.8, 25.4, 24.9, 25.7], description: 'High-volume rice production from the fertile Mekong Delta floodplains.' },
  { id: 'ACFC-00131', farmerId: 'FARMER_EJ_0055', commodity: 'Spices', region: 'East Java, Indonesia', expectedYield: '2.2 TONS', yieldTons: 2.2, discount: 18, settlementDate: 'DEC 2026', oracleConfidence: 91.5, investmentAmount: 6200, riskTier: 'Medium', contractHash: '0xDE45fa67BC89de01FA23bc45DE67fa89BC01de23', status: 'active', insuranceCovered: false, historicalYields: [2.0, 2.4, 1.9, 2.1, 2.3, 2.2], description: 'Mixed spice forward contract including clove, nutmeg, and cinnamon.' },
  { id: 'ACFC-00132', farmerId: 'FARMER_TN_0078', commodity: 'Wheat', region: 'Tamil Nadu, India', expectedYield: '15 TONS', yieldTons: 15, discount: 14, settlementDate: 'APR 2027', oracleConfidence: 92.8, investmentAmount: 18200, riskTier: 'Low', contractHash: '0xEF56ab78CD90ef12AB34cd56EF78ab90CD12ef34', status: 'active', insuranceCovered: true, historicalYields: [14.1, 15.3, 13.9, 14.8, 15.1, 14.6], description: 'Irrigated wheat production with drone-monitored growth stages.' },
  { id: 'ACFC-00133', farmerId: 'FARMER_KL_0033', commodity: 'Coffee', region: 'Kerala, India', expectedYield: '5 TONS', yieldTons: 5, discount: 22, settlementDate: 'JAN 2027', oracleConfidence: 85.3, investmentAmount: 14800, riskTier: 'High', contractHash: '0xFA67bc89DE01fa23BC45de67FA89bc01DE23fa45', status: 'active', insuranceCovered: false, historicalYields: [4.2, 5.8, 3.9, 4.7, 5.1, 4.4], description: 'Large-scale robusta coffee contract with higher discount reflecting elevation risk.' },
  { id: 'ACFC-00134', farmerId: 'FARMER_MD_0012', commodity: 'Rice', region: 'Mekong Delta, Vietnam', expectedYield: '18 TONS', yieldTons: 18, discount: 10, settlementDate: 'AUG 2026', oracleConfidence: 97.4, investmentAmount: 21900, riskTier: 'Low', contractHash: '0xAB78cd90EF12ab34CD56ef78AB90cd12EF34ab56', status: 'active', insuranceCovered: true, historicalYields: [17.8, 18.2, 17.4, 18.6, 17.9, 18.1], description: 'Premium jasmine rice forward with high oracle confidence.' },
  { id: 'ACFC-00135', farmerId: 'FARMER_TN_0099', commodity: 'Maize', region: 'Tamil Nadu, India', expectedYield: '12 TONS', yieldTons: 12, discount: 16, settlementDate: 'OCT 2026', oracleConfidence: 90.1, investmentAmount: 9800, riskTier: 'Medium', contractHash: '0xBC89de01FA23bc45DE67fa89BC01de23FA45bc67', status: 'active', insuranceCovered: true, historicalYields: [11.2, 12.8, 10.9, 11.5, 12.1, 11.7], description: 'Hybrid maize cultivation with satellite-verified acreage.' },
  { id: 'ACFC-00136', farmerId: 'FARMER_EJ_0071', commodity: 'Spices', region: 'East Java, Indonesia', expectedYield: '1.8 TONS', yieldTons: 1.8, discount: 25, settlementDate: 'MAR 2027', oracleConfidence: 82.6, investmentAmount: 4200, riskTier: 'High', contractHash: '0xCD90ef12AB34cd56EF78ab90CD12ef34AB56cd78', status: 'active', insuranceCovered: false, historicalYields: [1.5, 2.1, 1.4, 1.7, 1.9, 1.6], description: 'Small-batch vanilla and pepper contract with higher volatility.' },
  { id: 'ACFC-00137', farmerId: 'FARMER_KL_0056', commodity: 'Coffee', region: 'Kerala, India', expectedYield: '4 TONS', yieldTons: 4, discount: 17, settlementDate: 'FEB 2027', oracleConfidence: 93.0, investmentAmount: 11200, riskTier: 'Low', contractHash: '0xDE01fa23BC45de67FA89bc01DE23fa45BC67de89', status: 'active', insuranceCovered: true, historicalYields: [3.8, 4.2, 3.7, 4.1, 3.9, 4.0], description: 'Consistent arabica producer with strong historical yields.' },
];
