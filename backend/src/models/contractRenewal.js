/**
 * Contract Renewal Model
 * Handles automatic contract renewal system
 */

import { query } from '../config/database.js';

export async function createRenewalSchedule(contractId, renewalConfig) {
  const text = `
    INSERT INTO contract_renewals
    (contract_id, renewal_type, renewal_interval, max_renewals, auto_renew, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())
    RETURNING *
  `;

  const values = [
    contractId,
    renewalConfig.type,
    renewalConfig.interval,
    renewalConfig.maxRenewals,
    renewalConfig.autoRenew,
  ];

  return await query(text, values);
}

export async function getRenewalSchedule(contractId) {
  const text = 'SELECT * FROM contract_renewals WHERE contract_id = $1';
  return await query(text, [contractId]);
}

export async function updateRenewalSchedule(contractId, renewalConfig) {
  const text = `
    UPDATE contract_renewals
    SET renewal_type = $2, renewal_interval = $3, max_renewals = $4, auto_renew = $5
    WHERE contract_id = $1
    RETURNING *
  `;

  const values = [
    contractId,
    renewalConfig.type,
    renewalConfig.interval,
    renewalConfig.maxRenewals,
    renewalConfig.autoRenew,
  ];

  return await query(text, values);
}

export async function processRenewals() {
  const text = `
    SELECT cr.*, c.* FROM contract_renewals cr
    JOIN contracts c ON cr.contract_id = c.id
    WHERE cr.auto_renew = true AND cr.next_renewal <= NOW()
  `;

  return await query(text);
}

export async function deleteRenewalSchedule(contractId) {
  const text = 'DELETE FROM contract_renewals WHERE contract_id = $1';
  return await query(text, [contractId]);
}